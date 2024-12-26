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

type MensaDish = {
  dish_name: string;
  dish_category: string;
};

/**
 * function to extract all dishes from raw mensa menu html
 */
type extractMensaMenuDishes = (html: string) => MensaDish[];

/**
 * mensa_menu_dishes repository
 */
interface IMensaMenuDishesRepository {
  saveDishes(mensaId: MensaID, dishes: MensaDish[]): Promise<void>;
  getMensaDishesOn(mensaId: MensaID, date: string): Promise<DMensaDish[]>;
}
