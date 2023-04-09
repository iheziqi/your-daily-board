import { MensaMenu, mensaList } from './mensa';
import { getMensaMenu, hasMenu } from './getMensaMenu';
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
