import { mensaList } from './mensaList';
import { getMensaMenu } from './getMensaMenu';
import { getCurrentDate } from './utils/utils';
import { MenuDB, UserDB } from './database';

export type MensaMenu = {
	// The string id of mensa.
	category: string;
	// The current data in format of YYYY-MM-DD.
	date: string;
	// The string of menu.
	menuText: string;
};