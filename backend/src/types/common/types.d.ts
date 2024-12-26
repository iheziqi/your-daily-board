/** This file contains types of common need. */

/** Type of Mensa object */
interface MensaInfo {
  name: string;
  url: string;
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

/** Type of Exchange Rate */
type from_to = 'USD-CNY' | 'EUR-CNY';

type DBTicketInfo = {
  startStation: string;
  destStation: string;
  price: number;
  departureTime: Date;
  arriveTime: Date;
  trainName: string;
};
