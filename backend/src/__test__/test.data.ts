import {getCurrentDate} from '../utils/helpers';

export function getTestData() {
  /** test users */
  const exampleEmail1 = 'example@test.email';
  const exampleEmail2 = 'demo@test.email';
  const exampleEmail3 = 'test@test.email';
  const user1: DUser = {
    email: exampleEmail1,
  };
  const user2: DUser = {
    email: exampleEmail2,
  };
  const user3: DUser = {
    email: exampleEmail3,
  };

  /** test mensa info */
  const lmpl = {
    id: 'lmpl',
    name: 'Erlangen Langemarckplatz',
    url: 'https://www.werkswelt.de/index.php?id=lmpl',
  };
  const mohm = {
    id: 'mohm',
    name: 'Nürnberg Mensateria Ohm',
    url: 'https://www.werkswelt.de/index.php?id=mohm',
  };
  const isch = {
    id: 'isch',
    name: 'Nürnberg Insel Schütt',
    url: 'https://www.werkswelt.de/index.php?id=isch',
  };

  /** test menus  */
  const exampleMenu1 = 'test menu1';
  const exampleMenu2 = 'test menu2';
  const mensaMenu1: DMensaMenu = {
    mensa_id: 'mohm',
    menu: exampleMenu1,
    date: getCurrentDate(),
  };
  const mensaMenu2: DMensaMenu = {
    mensa_id: 'lmpl',
    menu: exampleMenu2,
    date: getCurrentDate(),
  };
  const mensaMenu3: DMensaMenu = {
    mensa_id: 'isch',
    menu: null,
    date: getCurrentDate(),
  };

  /** test exchange rates */
  const rate1 = 7.9999;
  const rate2 = 6.9999;
  const changeFromYesterday1 = 0.02;
  const changeFromYesterday2 = 0.02;
  const EUR_CNY: from_to = 'EUR-CNY';
  const USD_CNY: from_to = 'USD-CNY';

  const exchangeRate1: DExchangeRate = {
    from_to: EUR_CNY,
    exchange_rate: rate1,
    date: getCurrentDate(),
    change_from_yesterday: changeFromYesterday1,
  };
  const exchangeRate2: DExchangeRate = {
    from_to: USD_CNY,
    exchange_rate: rate2,
    date: getCurrentDate(),
    change_from_yesterday: changeFromYesterday2,
  };

  function users() {
    return {user1, user2, user3};
  }

  function mensaInfo() {
    return {lmpl, mohm, isch};
  }

  function menus() {
    return {mensaMenu1, mensaMenu2, mensaMenu3};
  }

  function exchangeRates() {
    return {exchangeRate1, exchangeRate2};
  }

  return {users, mensaInfo, menus, exchangeRates};
}
