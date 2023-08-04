import UserRepository from '../repositories/UserRepository';
import MensaMenuRepository from '../repositories/MensaMenuRepository';
import MensaInfoRepository from '../repositories/MensaInfoRepository';
import ExchangeRepository from '../repositories/ExchangeRepository';
import KnexService from '../database/KnexService';
import {getCurrentDate} from '../utils/helpers';

// Initial classes
const knexInstance = KnexService.getInstance();

// test data
const exampleEmail1 = 'example@test.email';
const exampleEmail2 = 'demo@test.email';
const exampleEmail3 = 'test@test.email';

const exampleMenu1 = 'test menu1';
const exampleMenu2 = 'test menu2';
const exampleMenu3 = 'test menu3';

beforeAll(async () => {
  // loads a mensa info into database.
  await knexInstance('mensa_info').insert({
    id: 'lmpl',
    name: 'Erlangen Langemarckplatz',
    url: 'https://www.werkswelt.de/index.php?id=lmpl',
  });

  // deletes all entries in users table.
  await knexInstance('users').del();

  // deletes all entries in mensa_menu table.
  await knexInstance('mensa_menu').del();

  // deletes all entries in exchange_rate table.
  await knexInstance('exchange_rate').del();
});

afterAll(async () => {
  // deletes all entries in users table.
  await knexInstance('users').del();

  // deletes all entries in mensa_menu table.
  await knexInstance('mensa_menu').del();

  // deletes all entries in mensa_info table.
  await knexInstance('mensa_info').del();

  // deletes all entries in exchange_rate table.
  await knexInstance('exchange_rate').del();

  // resets increments to 1.
  await knexInstance.raw('ALTER TABLE users AUTO_INCREMENT = 1');
  await knexInstance.raw('ALTER TABLE mensa_menu AUTO_INCREMENT = 1');
  await knexInstance.raw('ALTER TABLE mensa_info AUTO_INCREMENT = 1');

  // closes the knex connection to database.
  KnexService.destroyInstance();
});

describe('user repository unit tests', () => {
  const myUserRepo = new UserRepository(knexInstance);

  it('should create user into database', async () => {
    const user = await myUserRepo.createUser({email: exampleEmail1});
    const queryResult = await knexInstance
      .select()
      .from('users')
      .where('email', '=', exampleEmail1)
      .first();

    // User given should be returned
    expect(user?.email).toBe(exampleEmail1);

    // queried email should be the exactly same one as given
    expect(queryResult.email).toBe(exampleEmail1);
  });

  it('should get all users from database', async () => {
    await knexInstance('users').insert({email: exampleEmail2});

    const allUsers = await myUserRepo.getAllUsersEmail();

    // Returned value should be an array.
    expect(Array.isArray(allUsers)).toBeTruthy();
    // The length of returned array should be 2
    expect(allUsers?.length).toBe(2);

    // The email should be in the returned object.
    if (allUsers && allUsers?.length > 0) {
      for (const user of allUsers) {
        expect(user.email).toBeTruthy();
      }
    }
  });

  it('should update the user', async () => {
    const returnedValue = await myUserRepo.updateUserEmail({
      oldEmail: exampleEmail1,
      newEmail: exampleEmail3,
    });

    const queryResult = await knexInstance('users')
      .select()
      .where('email', '=', exampleEmail3)
      .first();

    // returned value should be the new email.
    expect(returnedValue).toEqual(exampleEmail3);
    // updated user info should be in database.
    expect(queryResult).toBeTruthy();
    expect(queryResult.email).toBe(exampleEmail3);
  });

  it('should delete the user', async () => {
    const returnedValue = await myUserRepo.deleteUser(exampleEmail3);

    const queryResult = await knexInstance('users')
      .select()
      .where('email', '=', exampleEmail3)
      .first();

    // returned value should be the email of deleted user
    expect(returnedValue).toEqual(exampleEmail3);
    // deleted user shouldn't exist in database
    expect(queryResult).toBeUndefined();
  });
});

describe('mensa menu repository unit tests', () => {
  const myMensaMenuRepo = new MensaMenuRepository(knexInstance);

  it('should load menu of given Mensa', async () => {
    const returnedValue = await myMensaMenuRepo.loadMensaMenuOfToday(
      exampleMenu1,
      'lmpl'
    );

    const queryResult = await knexInstance('mensa_menu')
      .select()
      .where('mensa_id', '=', 'lmpl')
      .first();

    // returned value should be the given menu
    expect(returnedValue).toBe(exampleMenu1);

    // menu data should be in the database
    expect(queryResult.menu).toBe(exampleMenu1);
  });

  it('should get the menu of given Mensa and date', async () => {
    const todayMenuOfLmpl = await myMensaMenuRepo.getMenuByMensaIdAndDate(
      'lmpl',
      getCurrentDate()
    );

    // returned value should be the menu of last test
    expect(todayMenuOfLmpl).toBe(exampleMenu1);
  });

  it('should return null if there is no menu of given date', async () => {
    const menu = await myMensaMenuRepo.getMenuByMensaIdAndDate(
      'lmpl',
      '1999-01-01'
    );

    expect(menu).toBeUndefined();
  });

  it('should return null if there is no menu of given Mensa', async () => {
    const menu = await myMensaMenuRepo.getMenuByMensaIdAndDate(
      'ansb',
      getCurrentDate()
    );

    expect(menu).toBeUndefined();
  });
});

describe('exchange rate repository unit tests', () => {
  const myExchangeRateRepo = new ExchangeRepository(knexInstance);
  const exchangeRate = 7.9999;
  const changeFromYesterday = 0.02;

  it('should load exchange rate of given date', async () => {
    const returnedValue = await myExchangeRateRepo.loadExchangeRateOfToday(
      exchangeRate,
      'EUR-CNY',
      changeFromYesterday
    );

    expect(returnedValue?.change_from_yesterday).toBe(changeFromYesterday);
    expect(returnedValue?.exchange_rate).toBe(exchangeRate);
    expect(returnedValue?.date).toBe(getCurrentDate());
    expect(returnedValue?.from_to).toBe('EUR-CNY');
  });

  it('should get exchange rate of given date and from_to', async () => {
    const returnedValue = await myExchangeRateRepo.getExchangeRateByDate(
      getCurrentDate(),
      'EUR-CNY'
    );

    expect(returnedValue?.change_from_yesterday).toBe(changeFromYesterday);
    expect(returnedValue?.exchange_rate).toBe(exchangeRate);
    expect(returnedValue?.date).toBe(getCurrentDate());
    expect(returnedValue?.from_to).toBe('EUR-CNY');
  });

  it('should return undefined when there is no exchange rate of given date', async () => {
    const returnedValue = await myExchangeRateRepo.getExchangeRateByDate(
      '1999-01-01',
      'EUR-CNY'
    );

    expect(returnedValue).toBeUndefined();
  });
});
