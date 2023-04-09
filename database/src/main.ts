import { MensaMenu, mensaList } from './mensa';
import { MenuScraper } from './getMensaMenu';
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