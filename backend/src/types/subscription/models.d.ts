/**
 * menu_subscriptions table
 */
interface DMensaMenuSubscription {
  user_id: number;
  mensa_id: MensaID;
}

/**
 * exchange_rate_subscriptions table
 */
interface DExchangeRateSubscription {
  user_id: number;
  from_to: from_to;
}
