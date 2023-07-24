/** This file contains type of mensa information. */

/** Type of Mensa object */
interface MensaDetailedInfo {
  id: string;
  name: string;
  url: string;
}

/** Type of Mensa ID */
type MensaID = 'sued' | 'lmpl' | 'mohm' | 'isch';
