import {RenderService} from '../services';
import KnexService from '../database/KnexService';
import {getTestData} from './test.data';
import {getDirPathOfEmailTemplate} from '../views/emails/v1/render';
import {
  MensaInfoRepository,
  SubscriptionRepository,
} from '../repositories/index';

/** Initial database connection instance */
const knexInstance = KnexService.getInstance();

beforeAll(async () => {
  // deletes all entries in tables.
  await knexInstance('exchange_rate_subscriptions').del();
  await knexInstance('menu_subscriptions').del();
  await knexInstance('users').del();
  await knexInstance('mensa_menu').del();
  await knexInstance('exchange_rate').del();
  await knexInstance('mensa_info').del();

  // Inserts test data
  await knexInstance('mensa_info').insert(getTestData().mensaInfo().isch);
  await knexInstance('mensa_info').insert(getTestData().mensaInfo().mohm);
  await knexInstance('mensa_info').insert(getTestData().mensaInfo().lmpl);
  await knexInstance('users').insert(getTestData().users().user1);
  await knexInstance('users').insert(getTestData().users().user2);
  await knexInstance('users').insert(getTestData().users().user3);
  await knexInstance('mensa_menu').insert(getTestData().menus().mensaMenu1);
  await knexInstance('mensa_menu').insert(getTestData().menus().mensaMenu2);
  await knexInstance('mensa_menu').insert(getTestData().menus().mensaMenu3);
  await knexInstance('exchange_rate').insert(
    getTestData().exchangeRates().exchangeRate1
  );
  await knexInstance('exchange_rate').insert(
    getTestData().exchangeRates().exchangeRate2
  );

  await knexInstance('menu_subscriptions').insert({
    user_id: 1,
    mensa_id: getTestData().mensaInfo().lmpl.id,
  });
  await knexInstance('menu_subscriptions').insert({
    user_id: 1,
    mensa_id: getTestData().mensaInfo().isch.id,
  });
  return await knexInstance('menu_subscriptions').insert({
    user_id: 1,
    mensa_id: getTestData().mensaInfo().mohm.id,
  });
});

afterAll(async () => {
  // deletes all entries in tables.
  await knexInstance('users').del();
  await knexInstance('mensa_menu').del();
  await knexInstance('exchange_rate').del();
  await knexInstance('exchange_rate_subscriptions').del();
  await knexInstance('menu_subscriptions').del();
  await knexInstance('mensa_info').del();

  // resets increments to 1.
  await knexInstance.raw('ALTER TABLE users AUTO_INCREMENT = 1');
  await knexInstance.raw('ALTER TABLE mensa_menu AUTO_INCREMENT = 1');

  // closes the knex connection to database.
  return KnexService.destroyInstance();
});

/**
 * A extended RenderService class for testing purpose.
 */
class TestRenderService extends RenderService {
  constructor() {
    const subRepo = new SubscriptionRepository(knexInstance);
    const mensaInfoRepo = new MensaInfoRepository(knexInstance);
    super(getDirPathOfEmailTemplate(), subRepo, mensaInfoRepo);
  }

  public testGetUserMensaMenu(email: string) {
    return this.getUserMensaMenus(email);
  }
}

describe('render service unit tests', () => {
  const testRenderService = new TestRenderService();
  const user1 = getTestData().users().user1;

  it('should get user subscribed mensa menus', async () => {
    const returnedValue = await testRenderService.testGetUserMensaMenu(
      user1.email
    );

    expect(Array.isArray(returnedValue)).toBeTruthy();
    expect(returnedValue.length).toBe(3);
    returnedValue.forEach(e => {
      if (e.jumpLinkId === getTestData().mensaInfo().isch.id) {
        expect(e.mensaName === getTestData().mensaInfo().isch.name);
      }
      if (e.jumpLinkId === getTestData().mensaInfo().lmpl.id) {
        expect(e.mensaName === getTestData().mensaInfo().lmpl.name);
      }
      if (e.jumpLinkId === getTestData().mensaInfo().mohm.id) {
        expect(e.mensaName === getTestData().mensaInfo().mohm.name);
      }
    });
  });
});
