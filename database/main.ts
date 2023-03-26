import { mensaList } from './mensaList';
import { getMensaMenu } from './getMensaMenu';
import { getCurrentDate } from './utils/utils';
import { MenuDB } from './database';

export type MensaMenu = {
	// The string id of mensa.
	category: string;
	// The current data in format of YYYY-MM-DD.
	date: string;
	// The string of menu.
	menuText: string;
};

const todayMenu: MensaMenu = {
	category: 'mohm',
	date: getCurrentDate(),
	menuText: 'this is an random test menu',
};

const menuDB = new MenuDB('daily-board.sqlite3');
// menuDB.insertMenu(todayMenu);
menuDB.queryMenu('mohm', getCurrentDate());
