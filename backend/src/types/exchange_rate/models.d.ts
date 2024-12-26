/**
 * exchange_rate table
 */
interface DExchangeRate {
  from_to?: from_to;
  date?: string;
  exchange_rate: number;
  change_from_yesterday: number;
}
