import { RenderService } from '../../services';
import { getTestData } from '../test.data';
import { getDirPathOfEmailTemplate } from '../../views/emails/v1/render';
import {
  MensaInfoRepository,
  SubscriptionRepository,
} from '../../repositories/index';
import { cleanupTables } from '../helpers/dbSetup';

/**
 * A extended RenderService class for testing purpose.
 */
class TestRenderService extends RenderService {
  constructor() {
    const subRepo = new SubscriptionRepository(global.__KNEX__);
    const mensaInfoRepo = new MensaInfoRepository(global.__KNEX__);
    super(getDirPathOfEmailTemplate(), subRepo, mensaInfoRepo);
  }

  public testGetUserMensaMenu(email: string) {
    return this.getUserMensaMenus(email);
  }
}

describe('RenderService Tests', () => {
  let testRenderService: TestRenderService;
  const testData = getTestData();

  beforeAll(() => {
    testRenderService = new TestRenderService();
  });

  beforeEach(async () => {
    await cleanupTables(global.__KNEX__);

    // Setup test data
    await global
      .__KNEX__('mensa_info')
      .insert([
        testData.mensaInfo().isch,
        testData.mensaInfo().mohm,
        testData.mensaInfo().lmpl,
      ]);

    await global
      .__KNEX__('users')
      .insert([
        testData.users().user1,
        testData.users().user2,
        testData.users().user3,
      ]);

    await global
      .__KNEX__('mensa_menu')
      .insert([
        testData.menus().mensaMenu1,
        testData.menus().mensaMenu2,
        testData.menus().mensaMenu3,
      ]);

    await global
      .__KNEX__('exchange_rate')
      .insert([
        testData.exchangeRates().exchangeRate1,
        testData.exchangeRates().exchangeRate2,
      ]);

    // Setup user subscriptions
    await global.__KNEX__('menu_subscriptions').insert([
      {
        user_id: 1,
        mensa_id: testData.mensaInfo().lmpl.id,
      },
      {
        user_id: 1,
        mensa_id: testData.mensaInfo().isch.id,
      },
      {
        user_id: 1,
        mensa_id: testData.mensaInfo().mohm.id,
      },
    ]);
  });

  describe('Menu Rendering Operations', () => {
    it('should get user subscribed mensa menus', async () => {
      const returnedValue = await testRenderService.testGetUserMensaMenu(
        testData.users().user1.email
      );

      expect(Array.isArray(returnedValue)).toBeTruthy();
      expect(returnedValue.length).toBe(3);

      returnedValue.forEach(e => {
        if (e.jumpLinkId === testData.mensaInfo().isch.id) {
          expect(e.mensaName).toBe(testData.mensaInfo().isch.name);
        }
        if (e.jumpLinkId === testData.mensaInfo().lmpl.id) {
          expect(e.mensaName).toBe(testData.mensaInfo().lmpl.name);
        }
        if (e.jumpLinkId === testData.mensaInfo().mohm.id) {
          expect(e.mensaName).toBe(testData.mensaInfo().mohm.name);
        }
      });
    });

    // Add more tests for other RenderService methods here
  });
});
