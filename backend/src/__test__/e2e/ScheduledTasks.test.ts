import { readFile } from 'fs/promises';
import { Knex } from 'knex';

import {
  MensaInfoRepository,
  MensaMenuDishesRepository,
  MensaMenuRepository,
} from '../../repositories';
import MensaMenuScraper from '../../scrapers/MensaMenuScraper';
import { RepoScheduledTasks } from '../../services';
import { getTestData } from '../test.data';
import path from 'path';
import MensaEventService from '../../services/mensa/MensaEventService';

describe('scheduled task integration test', () => {
  let knex: Knex;
  let mensaInfoRepo: MensaInfoRepository;
  let mensaMenuRepo: MensaMenuRepository;
  let mensaMenuDishesRepo: MensaMenuDishesRepository;
  let mensaMenuTestingScraper: MensaMenuScraper;

  class TestingMensaMenuScraper extends MensaMenuScraper {
    constructor() {
      super();
    }

    public async getMenu(url: string): Promise<string | null> {
      try {
        const fileName =
          '../data/https___web.archive.org_web_20240909123335_https___www.werkswelt.de_index.php_id=mohm.html';
        const filePath = path.join(__dirname, fileName);
        // Read the file content
        const content = await readFile(filePath, 'utf-8');
        return content;
      } catch (error) {
        // Handle errors (e.g., file not found)
        throw new Error(`Error reading file: ${error}`);
      }
    }
  }

  beforeAll(async () => {
    knex = global.__KNEX__;
    mensaInfoRepo = new MensaInfoRepository(knex);
    mensaMenuRepo = new MensaMenuRepository(knex);
    mensaMenuDishesRepo = new MensaMenuDishesRepository(knex);
    mensaMenuTestingScraper = new TestingMensaMenuScraper();

    const mensaInfo = getTestData().mensaInfo();
    await knex('mensa_info').insert(mensaInfo.isch);
    await knex('mensa_info').insert(mensaInfo.lmpl);
    await knex('mensa_info').insert(mensaInfo.mohm);
  });

  afterAll(async () => {
    MensaEventService.getInstance().removeAllListeners();
    await knex('mensa_menu_dishes').del();
    await knex('mensa_menu').del();
    await knex('mensa_info').del();
  });

  it('should successfully execute schedule tasks', async () => {
    /**
     * Because of the asynchronous nature of events,
     * even though saveMensaMenusToDatabase has completed,
     * the event handlers that actually save the dishes might not have finished yet.
     * The function returns before all the event handlers complete their work.
     * This function is used to track all dishes have been saved.
     */
    const waitForDishCount = async (expectedTotal: number) => {
      return new Promise<void>(resolve => {
        let count: any;
        const checkInterval = setInterval(async () => {
          count = await knex('mensa_menu_dishes').count<Record<string, number>>(
            'id as count'
          );
          if (count[0]['count'] === expectedTotal) {
            clearInterval(checkInterval);
            resolve();
          }
        }, 100);
      });
    };

    // In your test:
    const expectedDishCount = 6; // 2 dishes * 3 mensas
    await Promise.all([
      RepoScheduledTasks.saveMensaMenusToDatabase(
        mensaInfoRepo,
        mensaMenuRepo,
        mensaMenuDishesRepo,
        mensaMenuTestingScraper
      ),
      waitForDishCount(expectedDishCount),
    ]);

    const mensa_menu_dishes = await knex('mensa_menu_dishes')
      .where({ menu_id: 3 })
      .select();

    expect(mensa_menu_dishes).toHaveLength(2);
    expect(mensa_menu_dishes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          dish_name: 'Vegane Currywurst mit Soße und Pommes frites [So]',
          dish_category: 'Essen 1',
        }),
        expect.objectContaining({
          dish_name:
            'Hirtenkäse gebacken [Wz,Mi] mit Kräuter - Dip [5,Wz,Ei,Mi,Sen] und Gitterkartoffeln [Wz]',
          dish_category: 'Essen 2',
        }),
      ])
    );
  });
});
