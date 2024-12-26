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
