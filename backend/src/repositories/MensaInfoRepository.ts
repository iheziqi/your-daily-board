import {Knex} from 'knex';
import MensaInfoScraper from '../scrapers/MensaInfoScraper';

class MensaInfoRepository implements IMensaInfoRepository {
  /** Database connection object. */
  private db: Knex;

  constructor(knexInstance: Knex) {
    this.db = knexInstance;
  }

  /**
   * Gets all Mensa information.
   * @returns All Mensa information in a array.
   */
  public getAllMensaInfo(): Record<MensaID, DMensaInfo> {
    return {
      lmpl: {
        name: 'Erlangen Langemarckplatz',
        url: 'https://www.werkswelt.de/index.php?id=lmpl',
      },
      sued: {
        name: 'Erlangen Südmensa',
        url: 'https://www.werkswelt.de/index.php?id=sued',
      },
      'cafeteria-kochstrasse': {
        name: 'Erlangen Kochstraße',
        url: 'https://www.werkswelt.de/index.php?id=cafeteria-kochstrasse',
      },
      isch: {
        name: 'Nürnberg Insel Schütt',
        url: 'https://www.werkswelt.de/index.php?id=isch',
      },
      regb: {
        name: 'Nürnberg Regensburger Straße',
        url: 'https://www.werkswelt.de/index.php?id=regb',
      },
      spau: {
        name: 'Nürnberg St. Paul',
        url: 'https://www.werkswelt.de/index.php?id=spau',
      },
      mohm: {
        name: 'Nürnberg Mensateria Ohm',
        url: 'https://www.werkswelt.de/index.php?id=mohm',
      },
      'cafeteria-veilstr': {
        name: 'Nürnberg Veilhofstraße',
        url: 'https://www.werkswelt.de/index.php?id=cafeteria-veilstr',
      },
      hohf: {
        name: 'Nürnberg Hohfederstraße',
        url: 'https://www.werkswelt.de/index.php?id=hohf',
      },
      'cafeteria-langegasse': {
        name: 'Nürnberg Lange Gasse',
        url: 'https://www.werkswelt.de/index.php?id=cafeteria-langegasse',
      },
      baer: {
        name: 'Nürnberg Bärenschanzstraße',
        url: 'https://www.werkswelt.de/index.php?id=baer',
      },
      bingstrasse: {
        name: 'Nürnberg Bingstraße',
        url: 'https://www.werkswelt.de/index.php?id=bingstrasse',
      },
      eich: {
        name: 'Eichstätt',
        url: 'https://www.werkswelt.de/index.php?id=eich',
      },
      ingo: {
        name: 'Ingolstadt',
        url: 'https://www.werkswelt.de/index.php?id=ingo',
      },
      ansb: {
        name: 'Ansbach',
        url: 'https://www.werkswelt.de/index.php?id=ansb',
      },
      trie: {
        name: 'Triesdorf',
        url: 'https://www.werkswelt.de/index.php?id=trie',
      },
    };
  }

  /**
   * Gets Mensa information of given Mensa ID.
   * @param id Mensa id
   * @returns Mensa information containing name and url
   */
  public async getMensaInfoById(id: MensaID): Promise<DMensaInfo | undefined> {
    try {
      const mensaInfo = await this.db
        .select('name', 'url')
        .from('mensa_info')
        .where('id', id)
        .first();
      return mensaInfo;
    } catch (error) {
      console.error(
        'An error occurred while getting Mensa info by ID from database',
        error
      );
      return;
    }
  }

  /**
   * Loads all Mensa information to database.
   * @returns All Mensa information in an array
   */
  public async loadAllMensaInfo(): Promise<MensaInfo[] | null> {
    try {
      // Initialize scraper.
      const myMensaInfoScraper = new MensaInfoScraper();

      // Fetch all mensa info from website.
      const allMensaInfo = await myMensaInfoScraper.getAllMensaInfo();

      if (allMensaInfo) {
        // Ensure promises are resolved before proceeding.
        const promises = allMensaInfo.map(mensaInfo =>
          this.db('mensa_info').insert(mensaInfo)
        );
        await Promise.all(promises);

        return allMensaInfo;
      } else {
        console.log('Mensa info array is null!');
        return null;
      }
    } catch (error) {
      // Handle the error.
      console.error(
        'An error occurred while loading Mensa info to database:',
        error
      );
      return null;
    }
  }
}

export default MensaInfoRepository;
