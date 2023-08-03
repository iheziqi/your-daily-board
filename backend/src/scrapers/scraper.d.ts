/** This file contains types of scrapers' need. */

/** Type of Mensa object */
interface MensaInfo {
  id: string;
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
