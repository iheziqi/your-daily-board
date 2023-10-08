interface EmailInput {
  email: string;
}

/** Type of Mensa ID */
type MensaID =
  | 'sued'
  | 'lmpl'
  | 'mohm'
  | 'isch'
  | 'cafeteria-kochstrasse'
  | 'regb'
  | 'spau'
  | 'cafeteria-veilstr'
  | 'hohf'
  | 'cafeteria-langegasse'
  | 'baer'
  | 'bingstrasse'
  | 'eich'
  | 'ingo'
  | 'ansb'
  | 'trie';

/** Type of Mensa object */
interface MensaInfoObj {
  name: string;
  url: string;
}

/** Type of MensaInfo get from API */
type MensaInfo = Record<MensaID, MensaInfoObj>;

/** Type of Exchange Rate */
type FromTo = 'USD-CNY' | 'EUR-CNY';

type SubscriptionsLoaderData = {
  exchangeRateInfo: FromTo[];
  mensaInfo: MensaInfo;
};

type UserMensaMenuSubscriptions = {
  email: string;
  mensaMenuSubscriptions: MensaID[];
};

type UserExchangeRateSubscriptions = {
  email: string;
  exchangeRateSubscriptions: FromTo[];
};

type UserSubscriptions = {
  // email: string;
  mensaMenuSubscriptions: MensaID[];
  exchangeRateSubscriptions: FromTo[];
};
