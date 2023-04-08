import { MensaMenu, mensaList } from './mensa';
import { getMensaMenu } from './getMensaMenu';
import { getCurrentDate } from './utils/utils';
import { MenuDB, UserDB, SubscriptionDB } from './database';
import { cwd } from 'process';

const dbPath = `${cwd()}/daily-board.sqlite3`;

const menuDB = new MenuDB(dbPath);
const userDB = new UserDB(dbPath);
const subscriptionDB = new SubscriptionDB(dbPath);

subscriptionDB
	.querySubscription('heziqi4399@gmail.com')
	.then((data) => console.log(data))
	.catch((err) => console.error(err));
