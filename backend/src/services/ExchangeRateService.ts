import {Knex} from 'knex';
import {ExchangeRepository} from '../repositories/index';
import {getCurrentDate, getPreviousDay} from '../utils/helpers';

class ExchangeRateService {
  private exchangeRateRepo: ExchangeRepository;

  constructor(knexInstance: Knex) {
    this.exchangeRateRepo = new ExchangeRepository(knexInstance);
  }

  /**
   * Calculates volatility of given exchange rate.
   * @param fromTo
   * @param exchangeRateOfToday
   */
  public async calculateExchangeRateVolatility(
    fromTo: from_to,
    exchangeRateOfToday: number
  ): Promise<number | undefined> {
    try {
      const currentDate = getCurrentDate();

      // Gets the exchange rate of previous day.
      const exchangeRateYesterdayQuery =
        await this.exchangeRateRepo.getExchangeRateByDate(
          getPreviousDay(currentDate),
          fromTo
        );

      if (!exchangeRateYesterdayQuery) {
        return;
      }

      const volatility =
        exchangeRateOfToday - exchangeRateYesterdayQuery.exchange_rate;

      return parseFloat(volatility.toFixed(4));
    } catch (error) {
      console.log(
        `An error occurred when calculating the volatility of exchange rates ${fromTo} between ${getCurrentDate()} and ${getPreviousDay(
          getCurrentDate()
        )}`,
        error
      );
      return;
    }
  }
}

export default ExchangeRateService;
