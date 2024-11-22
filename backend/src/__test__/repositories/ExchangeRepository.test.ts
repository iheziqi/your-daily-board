import { ExchangeRepository } from '../../repositories';
import { cleanupTables } from '../helpers/dbSetup';
import { getCurrentDate } from '../../utils/helpers';

describe('ExchangeRepository Tests', () => {
  let exchangeRepo: ExchangeRepository;

  // Test data
  const exchangeRate = 7.9999;
  const changeFromYesterday = 0.02;
  const exchangeType1 = 'EUR-CNY';
  const exchangeType2 = 'USD-CNY';

  beforeAll(() => {
    exchangeRepo = new ExchangeRepository(global.__KNEX__);
  });

  beforeEach(async () => {
    await cleanupTables(global.__KNEX__);
  });

  describe('Exchange Rate Operations', () => {
    it('should load exchange rate of given date', async () => {
      const returnedValue = await exchangeRepo.loadExchangeRateOfToday(
        exchangeRate,
        exchangeType1,
        changeFromYesterday
      );

      expect(returnedValue?.change_from_yesterday).toBe(changeFromYesterday);
      expect(returnedValue?.exchange_rate).toBe(exchangeRate);
      expect(returnedValue?.date).toBe(getCurrentDate());
      expect(returnedValue?.from_to).toBe(exchangeType1);
    });

    it('should get exchange rate of given date and from_to', async () => {
      // First load an exchange rate
      await exchangeRepo.loadExchangeRateOfToday(
        exchangeRate,
        exchangeType1,
        changeFromYesterday
      );

      const returnedValue = await exchangeRepo.getExchangeRateByDate(
        getCurrentDate(),
        exchangeType1
      );

      expect(returnedValue?.change_from_yesterday).toBe(changeFromYesterday);
      expect(returnedValue?.exchange_rate).toBe(exchangeRate);
      expect(returnedValue?.date).toBe(getCurrentDate());
      expect(returnedValue?.from_to).toBe(exchangeType1);
    });

    it('should return undefined when there is no exchange rate of given date', async () => {
      const returnedValue = await exchangeRepo.getExchangeRateByDate(
        '1999-01-01',
        exchangeType1
      );

      expect(returnedValue).toBeUndefined();
    });

    it('should return undefined when there is no exchange rate of given from_to', async () => {
      // Load one exchange rate type
      await exchangeRepo.loadExchangeRateOfToday(
        exchangeRate,
        exchangeType1,
        changeFromYesterday
      );

      // Try to get a different exchange rate type
      const returnedValue = await exchangeRepo.getExchangeRateByDate(
        getCurrentDate(),
        exchangeType2
      );

      expect(returnedValue).toBeUndefined();
    });

    it('should update exchange rate if already exists for the same date and from_to', async () => {
      // Load initial exchange rate
      await exchangeRepo.loadExchangeRateOfToday(
        exchangeRate,
        exchangeType1,
        changeFromYesterday
      );

      // Update with new values
      const newRate = 8.0;
      const newChange = 0.03;
      const updatedValue = await exchangeRepo.loadExchangeRateOfToday(
        newRate,
        exchangeType1,
        newChange
      );

      expect(updatedValue?.exchange_rate).toBe(newRate);
      expect(updatedValue?.change_from_yesterday).toBe(newChange);
      expect(updatedValue?.date).toBe(getCurrentDate());
      expect(updatedValue?.from_to).toBe(exchangeType1);

      // Verify in database
      const dbValue = await exchangeRepo.getExchangeRateByDate(
        getCurrentDate(),
        exchangeType1
      );
      expect(dbValue?.exchange_rate).toBe(newRate);
      expect(dbValue?.change_from_yesterday).toBe(newChange);
    });
  });
});
