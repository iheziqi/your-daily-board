import { MensaMenuRepository } from '../../repositories';
import { cleanupTables } from '../helpers/dbSetup';
import { getCurrentDate } from '../../utils/helpers';

describe('MensaMenuRepository Tests', () => {
  let mensaMenuRepo: MensaMenuRepository;

  // Test data
  const exampleMenu1 = 'test menu1';
  const lmpl = {
    id: 'lmpl',
    name: 'Erlangen Langemarckplatz',
    url: 'https://www.werkswelt.de/index.php?id=lmpl',
  };

  beforeAll(() => {
    mensaMenuRepo = new MensaMenuRepository(global.__KNEX__);
  });

  beforeEach(async () => {
    await cleanupTables(global.__KNEX__);
    // Load test mensa info
    await global.__KNEX__('mensa_info').insert(lmpl);
  });

  describe('Menu Operations', () => {
    it('should load menu of given Mensa', async () => {
      const returnedValue = await mensaMenuRepo.loadMensaMenuOfToday(
        exampleMenu1,
        'lmpl'
      );

      const queryResult = await global
        .__KNEX__('mensa_menu')
        .select()
        .where('mensa_id', '=', 'lmpl')
        .first();

      // returned value should be the given menu
      expect(returnedValue).toBe(exampleMenu1);

      // menu data should be in the database
      expect(queryResult.menu).toBe(exampleMenu1);
    });

    it('should get the menu of given Mensa and date', async () => {
      // First load a menu
      await mensaMenuRepo.loadMensaMenuOfToday(exampleMenu1, 'lmpl');

      const todayMenuOfLmpl = await mensaMenuRepo.getMenuByMensaIdAndDate(
        'lmpl',
        getCurrentDate()
      );

      // returned value should be the menu of last test
      expect(todayMenuOfLmpl).toBe(exampleMenu1);
    });

    it('should return undefined if there is no menu of given date', async () => {
      const menu = await mensaMenuRepo.getMenuByMensaIdAndDate(
        'lmpl',
        '1999-01-01'
      );

      expect(menu).toBeUndefined();
    });

    it('should return undefined if there is no menu of given Mensa', async () => {
      const menu = await mensaMenuRepo.getMenuByMensaIdAndDate(
        'ansb',
        getCurrentDate()
      );

      expect(menu).toBeUndefined();
    });
  });
});
