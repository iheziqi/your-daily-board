import { Knex } from 'knex';
import { getCurrentDate } from '../utils/helpers';

class MensaMenuRepository implements IMensaMenuRepository {
  private db: Knex;

  constructor(knexInstance: Knex) {
    this.db = knexInstance;
  }

  /**
   * Loads menu for given Mensa into database.
   * @param menu the html of menu, it could be null because sometimes there is no menu.
   * @param mensaId the id of Mensa
   * @returns loaded menu html
   */
  public async loadMensaMenuOfToday(
    menu: string | null,
    mensaId: MensaID
  ): Promise<string | null> {
    try {
      await this.db<DMensaMenu>('mensa_menu').insert({
        mensa_id: mensaId,
        date: getCurrentDate(),
        menu: menu,
      });
      return menu;
    } catch (error) {
      console.error(
        `An error ocurred when loading menu of mensa ${mensaId}.`,
        error
      );
      return null;
    }
  }

  /**
   * Gets menu of given Mensa and date.
   * @param mensaId id of Mensa
   * @param date date in format YYYY-MM-DD
   * @returns menu html of given Mensa, undefined if there is no menu of the given date
   */
  public async getMenuByMensaIdAndDate(
    mensaId: MensaID,
    date: string
  ): Promise<string | undefined | null> {
    try {
      const queryResult = await this.db<DMensaMenu>('mensa_menu')
        .select('menu')
        .where({ mensa_id: mensaId, date: date })
        .first();

      return queryResult?.menu;
    } catch (error) {
      console.error(
        `An error ocurred when getting menu of mensa ${mensaId} on ${date}.`,
        error
      );
      return;
    }
  }
}

export default MensaMenuRepository;
