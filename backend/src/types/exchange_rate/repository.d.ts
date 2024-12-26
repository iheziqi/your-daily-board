/**
 * exchange_rate repository
 */
interface IExchangeRateRepository {
  // Loads exchange rate to database.
  loadExchangeRateOfToday(
    exchangeRate: number,
    from_to: from_to,
    change_from_yesterday: number
  ): Promise<DExchangeRate | null>;

  // Gets exchange rate of given date.
  getExchangeRateByDate(
    date: string,
    from_to: from_to
  ): Promise<DExchangeRate | undefined>;
}
