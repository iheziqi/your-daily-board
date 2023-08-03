/** This file contains type of mensa information. */

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
