import { Knex } from 'knex';
import MensaMenuDishesRepository from '../../repositories/MensaMenuDishesRepository';
import { setupTestDb } from '../helpers/dbSetup';
import { getCurrentDate } from '../../utils/helpers';

describe('MensaMenuDishesRepository', () => {
  let knex: Knex;
  let mensaMenuDishesRepository: MensaMenuDishesRepository;
  const testMensaId = 'mensa-1';
  const testDate = getCurrentDate();

  beforeAll(async () => {
    knex = await setupTestDb();
    mensaMenuDishesRepository = new MensaMenuDishesRepository(knex);
  });

  beforeEach(async () => {
    // Setup test data
    await knex('mensa_info').insert({
      id: testMensaId,
      name: 'Test Mensa',
      url: 'http://test.mensa',
    });

    await knex('mensa_menu').insert({
      mensa_id: testMensaId,
      date: testDate,
      menu: '<html>Test Menu</html>',
    });
  });

  afterEach(async () => {
    // Clean up test data
    await knex('mensa_menu_dishes').del();
    await knex('mensa_menu').del();
    await knex('mensa_info').del();
  });

  describe('saveDishes', () => {
    const testDishes: MensaDish[] = [
      {
        dish_name: 'Spaghetti Carbonara',
        dish_category: 'Essen 1',
      },
      {
        dish_name: 'Vegetable Curry',
        dish_category: 'Essen 2',
      },
    ];

    it('should successfully save dishes for an existing menu', async () => {
      await expect(
        mensaMenuDishesRepository.saveDishes(testMensaId as MensaID, testDishes)
      ).resolves.not.toThrow();

      // Verify dishes were saved
      const savedDishes = await knex('mensa_menu_dishes')
        .join('mensa_menu', 'mensa_menu_dishes.menu_id', 'mensa_menu.id')
        .where({
          'mensa_menu.mensa_id': testMensaId,
          'mensa_menu.date': testDate,
        })
        .select('dish_name', 'dish_category');

      expect(savedDishes).toHaveLength(2);
      expect(savedDishes).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            dish_name: 'Spaghetti Carbonara',
            dish_category: 'Essen 1',
          }),
          expect.objectContaining({
            dish_name: 'Vegetable Curry',
            dish_category: 'Essen 2',
          }),
        ])
      );
    });

    it('should throw error when menu does not exist', async () => {
      const nonExistentMensaId = 'non-existent-mensa';
      await expect(
        mensaMenuDishesRepository.saveDishes(
          nonExistentMensaId as MensaID,
          testDishes
        )
      ).rejects.toThrow(
        `No menu found for mensa ${nonExistentMensaId} on ${testDate}`
      );
    });
  });

  describe('getMensaDishesOn', () => {
    beforeEach(async () => {
      // Insert test menu and get its ID
      const [menuId] = await knex('mensa_menu')
        .where({
          mensa_id: testMensaId,
          date: testDate,
        })
        .pluck('id');

      // Insert test dishes
      await knex('mensa_menu_dishes').insert([
        {
          menu_id: menuId,
          dish_name: 'Schnitzel',
          dish_category: 'Essen 1',
        },
        {
          menu_id: menuId,
          dish_name: 'Salad',
          dish_category: 'Essen 2',
        },
      ]);
    });

    it('should return all dishes for a specific mensa on a given date', async () => {
      const dishes = await mensaMenuDishesRepository.getMensaDishesOn(
        testMensaId as MensaID,
        testDate
      );

      expect(dishes).toHaveLength(2);
      expect(dishes).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            dish_name: 'Schnitzel',
            dish_category: 'Essen 1',
          }),
          expect.objectContaining({
            dish_name: 'Salad',
            dish_category: 'Essen 2',
          }),
        ])
      );
    });

    it('should return empty array when no dishes exist for the given date', async () => {
      const nonExistentDate = '2023-01-01';
      const dishes = await mensaMenuDishesRepository.getMensaDishesOn(
        testMensaId as MensaID,
        nonExistentDate
      );

      expect(dishes).toHaveLength(0);
    });

    it('should return empty array for non-existent mensa', async () => {
      const nonExistentMensaId = 'non-existent-mensa';
      const dishes = await mensaMenuDishesRepository.getMensaDishesOn(
        nonExistentMensaId as MensaID,
        testDate
      );

      expect(dishes).toHaveLength(0);
    });
  });
});
