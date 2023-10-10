/** This file contains type for database layer. */

/**
 * users table
 */
interface DUser {
  id?: number;
  email: string;
  admin?: number;
  is_verified?: number;
}

/**
 * users_verifying table
 */
interface DUserVerifying {
  email: string;
  token: string;
}

/**
 * users_authentication table
 */
interface DUserAuthentication {
  email: string;
  authentication_code: number;
  expiration_timestamp: number;
}

/**
 * mensa_menu table
 */
interface DMensaMenu {
  id?: number;
  mensa_id: MensaID;
  date: string;
  menu: string | null;
}

/**
 * mensa_info table
 */
interface DMensaInfo {
  id: MensaID;
  name: string;
  url: string;
}

/**
 * exchange_rate table
 */
interface DExchangeRate {
  from_to?: from_to;
  date?: string;
  exchange_rate: number;
  change_from_yesterday: number;
}

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

/**
 * mensa_info repository
 */
interface IMensaInfoRepository {
  // Gets all Mensa information from database.
  getAllMensaInfo(): Promise<Record<MensaID, MensaInfo>>;

  // Gets information of given Mensa ID.
  getMensaInfoById(id: MensaID): Promise<MensaInfo | undefined>;

  // Loads information of all Mensa.
  loadAllMensaInfo(): Promise<MensaInfo[] | undefined>;
}

/**
 * mensa_menu repository
 */
interface IMensaMenuRepository {
  // Loads menu to given Mensa.
  loadMensaMenuOfToday(
    menu: string | null,
    mensaId: MensaID
  ): Promise<string | null>;

  // Gets menu from database.
  getMenuByMensaIdAndDate(
    mensaId: MensaID,
    date: string
  ): Promise<string | undefined | null>;
}

/**
 * user repository
 */
interface IUserRepository {
  // Creates a new user.
  createUser(userData: DUser): Promise<DUser>;

  // Gets all users' data from database.
  getAllUsersData(): Promise<DUser[]>;

  // Gets user's id by email.
  getUserIdByEmail(email: string): Promise<Pick<DUser, 'id'> | undefined>;

  // Updates a user's email.
  updateUserEmail(userData: {
    oldEmail: string;
    newEmail: string;
  }): Promise<string>;

  // Deletes a user from database.
  deleteUser(email: string): Promise<string>;

  // Creates verifying token to confirm the email address.
  createToBeVerifiedUser(email: string): Promise<string>;

  // Gets verifying token
  getVerifyingTokenByUserEmail(email: string): Promise<string | undefined>;

  // Gets email address by token
  getEmailByVerifyingToken(token: string): Promise<string | undefined>;

  // Deletes verified use in table users_verifying.
  deleteToBeVerifiedUser(email: string): Promise<string>;

  isVerifiedEmail(email: string): Promise<number | undefined>;
}

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
