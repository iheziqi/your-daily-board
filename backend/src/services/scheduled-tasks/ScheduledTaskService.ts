import KnexService from '../../database/KnexService';
import MensaMenuScraper from '../../scrapers/MensaMenuScraper';
import {
  fetchExchangeRate,
  getFromToCodes,
} from '../../scrapers/ExchangeRateScraper';
import { ExchangeRepository } from '../../repositories';
import { ExchangeRateService } from '../index';
import { extractDishes } from '../../repositories/helpers/extract-mensa-dishes';
import MensaEventService from '../mensa/MensaEventService';
import { getCurrentDate } from '../../utils/helpers';

export class RepoScheduledTasks {
  private static mensaEventService = MensaEventService.getInstance();
  private static setupEventHandlers(
    mensaMenuDishesRepo: IMensaMenuDishesRepository
  ) {
    // Setup event handler for menu saved event
    RepoScheduledTasks.mensaEventService.onMenuSaved(
      async ({ mensaId, menu, date }) => {
        try {
          let dishes: MensaDish[];
          if (!menu) {
            dishes = [];
          } else {
            dishes = extractDishes(menu);
          }
          await mensaMenuDishesRepo.saveDishes(mensaId, dishes);
        } catch (error) {
          RepoScheduledTasks.mensaEventService.emitDishesSaveFailed({
            mensaId,
            error: error as Error,
            date,
          });
          console.error(`Error saving dishes for ${mensaId}:`, error);
        }
      }
    );

    RepoScheduledTasks.mensaEventService.onDishesSaveFailed(
      ({ mensaId, error }) => {
        console.error(`Failed to save dishes for mensa ${mensaId}:`, error);
        // TODO: add retry logic here
      }
    );
  }

  /**
   * Fetches everyday mensa menu and save them to database.
   */
  public static async saveMensaMenusToDatabase(
    mensaInfoRepo: IMensaInfoRepository,
    mensaMenuRepo: IMensaMenuRepository,
    mensaMenuDishesRepo: IMensaMenuDishesRepository,
    mensaMenuScraper: MensaMenuScraper
  ) {
    // Ensure event handlers are setup
    RepoScheduledTasks.setupEventHandlers(mensaMenuDishesRepo);

    try {
      //Gets all names and urls of mensa.
      const mensaInfo = await mensaInfoRepo.getAllMensaInfo();
      const mensaIds = Object.keys(mensaInfo) as MensaID[];

      // Fetches menus on mensa websites and save them into database.
      // Using Promise.all to run the scraping and saving in parallel.
      await Promise.all(
        mensaIds.map(async mensaId => {
          const menu = await mensaMenuScraper.getMenu(mensaInfo[mensaId].url);
          await mensaMenuRepo.loadMensaMenuOfToday(menu, mensaId);

          // Emits event to extract and save mensa dishes
          this.mensaEventService.emitMenuSaved({
            mensaId,
            menu,
            date: getCurrentDate(),
          });
        })
      );

      console.log('All menus have been updated successfully');
    } catch (error) {
      console.error('An error occurred while updating menus:', error);
    }
  }

  /**
   * Fetches exchange rates and save them into database.
   */
  public static async saveExchangeRateToDatabase() {
    // Initializes repos
    const exchangeRateRepo = new ExchangeRepository(KnexService.getInstance());
    const exchangeService = new ExchangeRateService(KnexService.getInstance());

    try {
      // Gets all exchange rate types like 'EUR-CNY'.
      const fromToCodes = getFromToCodes();

      // Iterate through all exchange rate types needed to scrape,
      // fetch the exchange rates and store the promises.
      const exchangePromises = fromToCodes.map(async fromTo => {
        // Fetches exchange rate from website source.
        const exchangeRateString = await fetchExchangeRate(fromTo);

        if (!exchangeRateString) {
          console.error(
            `Error fetching exchange rate for ${fromTo}. Skipping database update.`
          );
          return;
        }

        const exchangeRateNum = parseFloat(exchangeRateString);

        const changeFromYesterday =
          await exchangeService.calculateExchangeRateVolatility(
            fromTo,
            exchangeRateNum
          );

        // The edge case is when there is no exchange rate for yesterday of this from_to type,
        // here just load undefined to database and it will be processed as null.
        await exchangeRateRepo.loadExchangeRateOfToday(
          exchangeRateNum,
          fromTo,
          changeFromYesterday!
        );
      });

      await Promise.all(exchangePromises);

      console.log('Exchange rates have been updated.');
    } catch (error) {
      console.error('An error occurred while updating exchange rates:', error);
    }
  }
}
