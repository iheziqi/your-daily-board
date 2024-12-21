import { SubscriptionRepository } from '../../repositories';
import { cleanupTables } from '../helpers/dbSetup';
import { getCurrentDate } from '../../utils/helpers';

describe('SubscriptionRepository Tests', () => {
  let subscriptionRepo: SubscriptionRepository;

  // Test data
  const testUser = { email: 'test@example.com' };
  const exchangeType1 = 'EUR-CNY';
  const exchangeType2 = 'USD-CNY';
  const lmpl = {
    id: 'lmpl',
    name: 'Erlangen Langemarckplatz',
    url: 'https://www.werkswelt.de/index.php?id=lmpl',
  };
  const mohm = {
    id: 'mohm',
    name: 'th',
    url: 'https://www.werkswelt.de/index.php?id=mohm',
  };

  beforeAll(() => {
    subscriptionRepo = new SubscriptionRepository(global.__KNEX__);
  });

  beforeEach(async () => {
    await cleanupTables(global.__KNEX__);
    // Setup test data
    await global.__KNEX__('users').insert(testUser);
    await global.__KNEX__('mensa_info').insert([lmpl, mohm]);
  });

  describe('Exchange Rate Subscription Operations', () => {
    it('should create exchange rate subscription for user', async () => {
      const subscription =
        await subscriptionRepo.createExchangeRateSubscription(
          testUser.email,
          exchangeType1
        );

      expect(subscription).toBeDefined();
      expect(subscription?.from_to).toBe(exchangeType1);

      const dbSubscription = await global
        .__KNEX__('exchange_rate_subscriptions')
        .where('from_to', exchangeType1)
        .first();
      expect(dbSubscription).toBeDefined();
      expect(dbSubscription.from_to).toBe(exchangeType1);
    });

    it('should get exchange rate subscriptions for user', async () => {
      await subscriptionRepo.createExchangeRateSubscription(
        testUser.email,
        exchangeType1
      );

      const subscriptions =
        await subscriptionRepo.getExchangeRateSubscriptionsByUserEmail(
          testUser.email
        );

      expect(Array.isArray(subscriptions)).toBeTruthy();
      expect(subscriptions?.length).toBe(1);
      expect(subscriptions![0]).toBe(exchangeType1);
    });

    it('should update exchange rate subscriptions', async () => {
      // Create initial subscription
      await subscriptionRepo.createExchangeRateSubscription(
        testUser.email,
        exchangeType1
      );

      // Update subscriptions
      const newSubscriptions = [exchangeType1, exchangeType2];
      const result = await subscriptionRepo.updateExchangeRateSubscription(
        testUser.email,
        newSubscriptions as from_to[]
      );

      expect(result).toEqual(newSubscriptions);

      const dbSubscriptions = await global
        .__KNEX__('exchange_rate_subscriptions')
        .select('from_to')
        .orderBy('from_to');
      expect(dbSubscriptions.map(s => s.from_to)).toEqual(newSubscriptions);
    });

    it('should get subscribed exchange rates of today', async () => {
      // Create subscription
      await subscriptionRepo.createExchangeRateSubscription(
        testUser.email,
        exchangeType1
      );

      // Add exchange rate data
      await global.__KNEX__('exchange_rate').insert({
        from_to: exchangeType1,
        date: getCurrentDate(),
        exchange_rate: 7.9999,
        change_from_yesterday: 0.02,
      });

      const rates =
        await subscriptionRepo.getUserSubscribedExchangeRatesOfToday(
          testUser.email
        );

      expect(rates.length).toBe(1);
      expect(rates[0].from_to).toBe(exchangeType1);
      expect(rates[0].exchange_rate).toBe(7.9999);
    });
  });

  describe('Mensa Menu Subscription Operations', () => {
    it('should create menu subscription for user', async () => {
      const subscription = await subscriptionRepo.createMensaMenuSubscription(
        testUser.email,
        lmpl.id as MensaID
      );

      expect(subscription).toBeDefined();
      expect(subscription?.mensa_id).toBe(lmpl.id);

      const dbSubscription = await global
        .__KNEX__('menu_subscriptions')
        .where('mensa_id', lmpl.id)
        .first();
      expect(dbSubscription).toBeDefined();
      expect(dbSubscription.mensa_id).toBe(lmpl.id);
    });

    it('should get menu subscriptions for user', async () => {
      await subscriptionRepo.createMensaMenuSubscription(
        testUser.email,
        lmpl.id as MensaID
      );

      const subscriptions =
        await subscriptionRepo.getMensaMenuSubscriptionsByUserEmail(
          testUser.email
        );

      expect(Array.isArray(subscriptions)).toBeTruthy();
      expect(subscriptions?.length).toBe(1);
      expect(subscriptions![0]).toBe(lmpl.id);
    });

    it('should update menu subscriptions', async () => {
      // Create initial subscription
      await subscriptionRepo.createMensaMenuSubscription(
        testUser.email,
        lmpl.id as MensaID
      );

      // Update subscriptions
      const newSubscriptions = [lmpl.id, mohm.id];
      const result = await subscriptionRepo.updateMensaMenuSubscription(
        testUser.email,
        newSubscriptions as MensaID[]
      );

      expect(result).toEqual(newSubscriptions);

      const dbSubscriptions = await global
        .__KNEX__('menu_subscriptions')
        .select('mensa_id')
        .orderBy('mensa_id');
      expect(dbSubscriptions.map(s => s.mensa_id)).toEqual(newSubscriptions);
    });

    it('should get subscribed mensa menus of today', async () => {
      // Create subscription
      await subscriptionRepo.createMensaMenuSubscription(
        testUser.email,
        lmpl.id as MensaID
      );

      // Add menu data
      const menuText = "Today's special menu";
      await global.__KNEX__('mensa_menu').insert({
        mensa_id: lmpl.id,
        date: getCurrentDate(),
        menu: menuText,
      });

      const menus = await subscriptionRepo.getUserSubscribedMensaMenusOfToday(
        testUser.email
      );

      expect(menus.length).toBe(1);
      expect(menus[0].mensa_id).toBe(lmpl.id);
      expect(menus[0].menu).toBe(menuText);
    });
  });

  describe('Error Handling', () => {
    it('should handle non-existent user for exchange rate subscription', async () => {
      const subscription =
        await subscriptionRepo.createExchangeRateSubscription(
          'nonexistent@example.com',
          exchangeType1
        );
      expect(subscription).toBeUndefined();
    });

    it('should handle non-existent user for menu subscription', async () => {
      const subscription = await subscriptionRepo.createMensaMenuSubscription(
        'nonexistent@example.com',
        lmpl.id as MensaID
      );
      expect(subscription).toBeUndefined();
    });
  });
});
