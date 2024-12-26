/**
 * mensa_subscription and exchange_rate_subscription repository
 */
interface ISubscriptionRepository {
  // Creates new Mensa menu subscription for given user into database.
  createMensaMenuSubscription(
    email: string,
    mensaId: MensaID
  ): Promise<DMensaMenuSubscription | undefined>;

  // Creates new exchange rate subscription for given user into database.
  createExchangeRateSubscription(
    email: string,
    from_to: from_to
  ): Promise<DExchangeRateSubscription | undefined>;

  // Gets menu subscription of given user from database.
  getMensaMenuSubscriptionsByUserEmail(
    email: string
  ): Promise<MensaID[] | undefined>;

  // Gets exchange rate subscription of given user from database.
  getExchangeRateSubscriptionsByUserEmail(
    email: string
  ): Promise<from_to[] | undefined>;

  // Gets all subscribed exchange rates of the given user.
  getUserSubscribedExchangeRatesOfToday(
    email: string
  ): Promise<DExchangeRate[]>;

  // Gets all subscribed mensa menus of the given user.
  getUserSubscribedMensaMenusOfToday(email: string): Promise<DMensaMenu[]>;

  // Updates mensa menu subscription of given user
  updateMensaMenuSubscription(
    email: string,
    mensaMenuSubscription: MensaID[]
  ): Promise<MensaID[]>;

  updateExchangeRateSubscription(
    email: string,
    exchangeRateSubscription: from_to[]
  ): Promise<from_to[]>;
}
