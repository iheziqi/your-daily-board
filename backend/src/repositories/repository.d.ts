/** This file contains type for database layer. */

type DUser = {
  id?: string;
  email: string;
  admin?: boolean;
};

interface DMensaMenu {
  id: number;
  mensa_id: string;
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

interface DSubscription {
  user_id?: string;
  menu_sub?: string;
  exchange_rate_sub?: string;
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
  loadMensaMenuOfToday(menu: string, mensaId: MensaID): Promise<string | null>;

  // Gets menu from database.
  getMenuByMensaIdAndDate(
    mensaId: MensaID,
    date: string
  ): Promise<string | null>;
}

interface IUserRepository {
  // Creates a new user.
  createUser(userData: DUser): Promise<DUser | undefined>;

  // Gets all users' email from database.
  getAllUsersEmail(): Promise<DUser[] | undefined>;

  // Updates a user's email.
  updateUserEmail(userData: {
    oldEmail: string;
    newEmail: string;
  }): Promise<string | undefined>;

  // Deletes a user from database.
  deleteUser(email: string): Promise<string | undefined>;

  // Gets menu subscriptions for given user.
  getMenuSubscriptionByUserEmail(email: string): Promise<MensaID[] | undefined>;
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
  createMensaMenuSubscriptionOfUser(
    email: string,
    mensaId: MensaID
  ): Promise<void>;

  // Creates new exchange rate subscription for given user into database.
  createExchangeRateSubscriptionOfUser(
    email: string,
    from_to: from_to
  ): Promise<void>;

  // Gets menu subscription of given user from database.
  getMensaMenuSubscriptionsByUserEmail(
    email: string
  ): Promise<DSubscription[] | undefined>;

  // Gets exchange rate subscription of given user from database.
  getExchangeRateSubscriptionsByUserEmail(
    email: string
  ): Promise<DExchangeRate[] | undefined>;
}
