/** This file contains type for database layer. */

interface DUser {
  id?: number;
  email: string;
  admin?: number;
  isVerified?: number;
}

interface DMensaMenu {
  id?: number;
  mensa_id: MensaID;
  date: string;
  menu: string | null;
}

interface DMensaInfo {
  name: string;
  url: string;
}

interface DExchangeRate {
  from_to?: from_to;
  date?: string;
  exchange_rate: number;
  change_from_yesterday: number;
}

interface DMensaMenuSubscription {
  user_id: number;
  mensa_id: string;
}

interface DExchangeRateSubscription {
  user_id: number;
  from_to: from_to;
}

interface IMensaInfoRepository {
  // Gets all Mensa information from database.
  getAllMensaInfo(): Record<MensaID, DMensaInfo>;

  // Gets information of given Mensa ID.
  getMensaInfoById(id: MensaID): Promise<DMensaInfo | undefined>;

  // Loads information of all Mensa.
  loadAllMensaInfo(): Promise<MensaInfo[] | null>;
}

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
  ): Promise<string | undefined>;
}

interface IUserRepository {
  // Creates a new user.
  createUser(userData: DUser): Promise<DUser | undefined>;

  // Gets all users' data from database.
  getAllUsersData(): Promise<DUser[] | undefined>;

  // Gets user's id by email.
  getUserIdByEmail(email: string): Promise<Pick<DUser, 'id'> | undefined>;

  // Updates a user's email.
  updateUserEmail(userData: {
    oldEmail: string;
    newEmail: string;
  }): Promise<string | undefined>;

  // Deletes a user from database.
  deleteUser(email: string): Promise<string | undefined>;

  // Creates verifying token to confirm the email address.
  createToBeVerifiedUser(email: string): Promise<string | undefined>;

  // Gets verifying token
  getVerifyingTokenByUserEmail(email: string): Promise<string | undefined>;

  // Gets email address by token
  getEmailByVerifyingToken(token: string): Promise<string | undefined>;

  // Deletes verified use in table users_verifying.
  deleteToBeVerifiedUser(email: string): Promise<string | undefined>;
}

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

interface ISubscriptionRepository {
  // Creates new Mensa menu subscription for given user into database.
  createMensaMenuSubscription(
    email: string,
    mensaId: MensaID
  ): Promise<DMensaMenuSubscription | null>;

  // Creates new exchange rate subscription for given user into database.
  createExchangeRateSubscription(
    email: string,
    from_to: from_to
  ): Promise<DExchangeRateSubscription | null>;

  // Gets menu subscription of given user from database.
  getMensaMenuSubscriptionsByUserEmail(
    email: string
  ): Promise<MensaID[] | undefined>;

  // Gets exchange rate subscription of given user from database.
  getExchangeRateSubscriptionsByUserEmail(
    email: string
  ): Promise<from_to[] | undefined>;

  // Gets all subscribed exchange rates of the given user.
  getUserSubscribedExchangeRates(email: string): Promise<DExchangeRate[]>;

  // Gets all subscribed mensa menus of the given user.
  getUserSubscribedMensaMenusOfToday(email: string): Promise<DMensaMenu[]>;
}
