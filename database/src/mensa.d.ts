/**
 * Types of Mensa information.
 */

/** Type of Mensa object */
export type Mensa = {
	id: string;
	name: string;
	url: string;
};

/** All Mensa Information */
export const mensaList: Mensa[] = [
	{
		id: 'sued',
		name: 'Mensa TechFack',
		url: 'https://www.werkswelt.de/index.php?id=sued',
	},
	{
		id: 'lmpl',
		name: 'Mensa Langemarckplatz Erlangen',
		url: 'https://www.werkswelt.de/index.php?id=lmpl',
	},
	{
		id: 'mohm',
		name: 'Mensa Ohm Nürnberg',
		url: 'https://www.werkswelt.de/index.php?id=mohm',
	},
	{
		id: 'isch',
		name: 'Mensa Insel Schütt',
		url: 'https://www.werkswelt.de/index.php?id=isch',
	},
];

/**
 * Types related to database functionality.
 */

/** The entry stored in database mensa_menus table */
export type MensaMenu = {
	// The string id of mensa.
	category: string;
	// The current data in format of YYYY-MM-DD.
	date: string;
	// The string of menu.
	menuText: string;
};

/** The result entry retrieved from the table mensa_menus */
export type MenuEntry = { menu: string }[];

/** The interface of class to crud table mensa_menus */
export interface MensaMenuTableCrud {
	insertMenu: (menu: MensaMenu) => void;
	queryMenu: (category: string, date: string) => Promise<MenuEntry>;
}

/** The result entry retrieved from the users table */
export type UsersEntry = { email: string }[];

/** The interface of class to crud users table */
export interface UserTableCrud {
	queryUsers: () => Promise<UsersEntry | null>;
	insertUser: (email: string) => void;
	deleteUser: (email: string) => void;
}

/** The result retrieved from database table subscribe */
export type SubscriptionEntry = { email: string; category: string }[];

/** The interface of class to crud subscribe table */
export interface SubscriptionTableCrud {
	insertSubscription: (email: string, category: string) => void;
	deleteSubscription: (email: string, category: string) => void;
	querySubscription: (email: string) => Promise<SubscriptionEntry>;
}
