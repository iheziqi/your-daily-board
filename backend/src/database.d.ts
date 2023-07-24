/** This file contains type for database layer. */

interface DMensaInfo {
  id: string;
  name: string;
}

interface DMensaMenu {
  id: number;
  mensa_id: string;
  date: string;
  menu: string | null;
}
