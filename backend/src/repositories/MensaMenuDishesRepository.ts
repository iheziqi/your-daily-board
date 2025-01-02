import { Knex } from 'knex';
import { getCurrentDate } from '../utils/helpers';
import { logger } from '../logging/logger';

class MensaMenuDishesRepository implements IMensaMenuDishesRepository {
  constructor(private knexInstance: Knex) {}

  /**
   * Saves dishes for a specific mensa menu
   * @param mensaId The ID of the mensa
   * @param dishes Array of dishes to save
   */
  async saveDishes(mensaId: MensaID, dishes: MensaDish[]): Promise<void> {
    const today = getCurrentDate();
    try {
      // First get the menu_id from mensa_menu table using mensaId and current date
      // Using the date from the first dish since all dishes are from same date
      const menuRecord = await this.knexInstance('mensa_menu')
        .select('id')
        .where({
          mensa_id: mensaId,
          date: today,
        })
        .first();

      if (!menuRecord) {
        throw new Error(`No menu found for mensa ${mensaId} on ${today}`);
      }

      // Prepare the dishes data with menu_id
      const dishesData = dishes.map(dish => ({
        menu_id: menuRecord.id,
        dish_name: dish.dish_name,
        dish_category: dish.dish_category,
      }));

      // Insert all dishes in a transaction
      await this.knexInstance.transaction(async trx => {
        await trx('mensa_menu_dishes').insert(dishesData);
      });
    } catch (error) {
      logger.error(
        'MensaMenuDishesRepository#saveDishes: error saving mensa dishes',
        error
      );
      throw error;
    }
  }

  /**
   * Gets all dishes for a specific mensa on a given date
   * @param mensaId The ID of the mensa
   * @param date The date to get dishes for (YYYY-MM-DD format)
   * @returns Array of dishes
   */
  async getMensaDishesOn(
    mensaId: MensaID,
    date: string
  ): Promise<DMensaDish[]> {
    try {
      const dishes = await this.knexInstance('mensa_menu_dishes as dishes')
        .join('mensa_menu as menu', 'dishes.menu_id', 'menu.id')
        .select(
          'dishes.id',
          'dishes.dish_name',
          'dishes.dish_category',
          'menu.date'
        )
        .where({
          'menu.mensa_id': mensaId,
          'menu.date': date,
        });

      return dishes;
    } catch (error) {
      logger.error(
        `MensaMenuDishesRepository#getMensaDishesOn ${mensaId} ${date}: error getting mensa dishes`,
        error
      );
      throw error;
    }
  }
}

export default MensaMenuDishesRepository;
