import { Knex } from 'knex';
import { getCurrentDate } from '../utils/helpers';
import { logger } from '../logging/logger';

class ExchangeRepository implements IExchangeRateRepository {
  private db: Knex;

  constructor(knexInstance: Knex) {
    this.db = knexInstance;
  }

  /**
   * Loads or updates the exchange rate of given date into database.
   * @param exchangeRate
   * @param from_to
   * @param change_from_yesterday The volatility of exchange rate compared to yesterday
   * @returns
   */
  public async loadExchangeRateOfToday(
    exchangeRate: number,
    from_to: from_to,
    change_from_yesterday: number
  ): Promise<DExchangeRate | null> {
    try {
      const today = getCurrentDate();
      const data = {
        from_to,
        date: today,
        exchange_rate: exchangeRate,
        change_from_yesterday,
      };

      await this.db('exchange_rate')
        .insert(data)
        .onConflict(['from_to', 'date'])
        .merge();

      return data;
    } catch (error) {
      logger.error(
        `An error occurred when loading exchange rate of ${from_to} on ${getCurrentDate()}`,
        error
      );
      return null;
    }
  }

  /**
   * Gets exchange rate of given date and from_to.
   * @param date
   * @param from_to
   * @returns
   */
  public async getExchangeRateByDate(
    date: string,
    from_to: from_to
  ): Promise<DExchangeRate | undefined> {
    const exchangeRate = await this.db<DExchangeRate>('exchange_rate')
      .select()
      .where({ date, from_to })
      .first();

    return exchangeRate;
  }
}

export default ExchangeRepository;
