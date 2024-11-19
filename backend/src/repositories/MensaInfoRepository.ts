import { Knex } from 'knex';
import MensaInfoScraper from '../scrapers/MensaInfoScraper';

class MensaInfoRepository implements IMensaInfoRepository {
  /** Database connection object. */
  private db: Knex;

  constructor(knexInstance: Knex) {
    this.db = knexInstance;
  }

  /**
   * Gets all Mensa information object.
   * @returns All Mensa information in an object with MensaID as the key.
   */
  public async getAllMensaInfo(): Promise<Record<MensaID, MensaInfo>> {
    const mensaInfoArr = await this.db<DMensaInfo>('mensa_info').select();
    const mensaInfoObj = {} as Record<MensaID, MensaInfo>;

    for (const mensa of mensaInfoArr) {
      // Use the 'id' property as the key in the output object
      mensaInfoObj[mensa.id] = {
        name: mensa.name,
        url: mensa.url,
      };
    }

    return mensaInfoObj;
  }

  /**
   * Gets Mensa information of given Mensa ID.
   * @param id Mensa id
   * @returns Mensa information containing name and url
   */
  public async getMensaInfoById(id: MensaID): Promise<MensaInfo | undefined> {
    const mensaInfo = await this.db<DMensaInfo>('mensa_info')
      .select('name', 'url')
      .where('id', id)
      .first();
    return mensaInfo;
  }

  /**
   * Loads all Mensa information to database.
   * @returns All Mensa information in an array
   */
  public async loadAllMensaInfo(): Promise<MensaInfo[] | undefined> {
    // Initialize scraper.
    const myMensaInfoScraper = new MensaInfoScraper();

    // Fetch all mensa info from website.
    const allMensaInfo = await myMensaInfoScraper.getAllMensaInfo();

    if (!allMensaInfo) {
      console.log('Mensa info array is null!');
      return;
    }

    // Uses Promise.all to resolve promises concurrently.
    const promises = allMensaInfo.map(mensaInfo =>
      this.db<DMensaInfo>('mensa_info').insert(mensaInfo)
    );
    await Promise.all(promises);

    return allMensaInfo;
  }
}

export default MensaInfoRepository;
