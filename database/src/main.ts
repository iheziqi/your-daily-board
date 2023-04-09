import { MensaMenu, mensaList } from './mensa';
import { getMensaMenu } from './getMensaMenu';
import { getCurrentDate } from './utils/utils';
import { MenuDB, UserDB, SubscriptionDB } from './database';
import { cwd } from 'process';

const dbPath = `${cwd()}/daily-board.sqlite3`;

enum MensaID {
	sued = 'sued',
	lmpl = 'lmpl',
	mohm = 'mohm',
	ishc = 'isch',
}

const menuDB = new MenuDB(dbPath);
const userDB = new UserDB(dbPath);
const subscriptionDB = new SubscriptionDB(dbPath);

console.log('start');

subscriptionDB
	.querySubscription('heziqi4399@gmil.com')
	.then((data) => console.log(data))
	.catch((err) => console.error(err));
console.log('middle');

menuDB
	.queryMenu(MensaID.mohm, '2023-04-08')
	.then((data) => console.log(data))
	.catch((err) => console.log(err));
console.log('end');
