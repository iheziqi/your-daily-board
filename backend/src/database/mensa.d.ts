/**
 * Types of Mensa information.
 */

/** Type of Mensa object */
export type Mensa = {
	id: string;
	name: string;
	url: string;
	picture?: string;
};

/** Type of Mensa ID */
export type MensaID = 'sued' | 'lmpl' | 'mohm' | 'isch';

/** All Mensa Information */
export const mensaList: Mensa[] = [
	{
		id: 'sued',
		name: 'Mensa TechFack',
		url: 'https://www.werkswelt.de/index.php?id=sued',
		picture:
			'https://www.werkswelt.de/data/uploads/gastronomie/slideshows/suedmensa-(3).jpg',
	},
	{
		id: 'lmpl',
		name: 'Mensa Langemarckplatz Erlangen',
		url: 'https://www.werkswelt.de/index.php?id=lmpl',
		picture:
			'https://www.werkswelt.de/data/uploads/gastronomie/slideshows/lmpl-studentenhaus-3-2017.jpg',
	},
	{
		id: 'mohm',
		name: 'Mensa Ohm Nürnberg',
		url: 'https://www.werkswelt.de/index.php?id=mohm',
		picture:
			'https://www.werkswelt.de/data/uploads/gastronomie/slideshows/hg-mensa-ohm.jpg',
	},
	{
		id: 'isch',
		name: 'Mensa Insel Schütt',
		url: 'https://www.werkswelt.de/index.php?id=isch',
		picture:
			'https://www.werkswelt.de/data/uploads/gastronomie/slideshows/inselschuett-2016.jpg',
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
	insertMenu: (menu: MensaMenu) => Promise<void>;
	queryMenu: (category: string, date: string) => Promise<MenuEntry>;
}

/** The result entry retrieved from the users table */
export type UsersEntry = { email: string }[];

/** The interface of class to crud users table */
export interface UserTableCrud {
	queryUsers: () => Promise<UsersEntry | null>;
	insertUser: (email: string) => Promise<void>;
	deleteUser: (email: string) => Promise<void>;
}

/** The result retrieved from database table subscribe */
export type SubscriptionEntry = { email: string; category: string }[];

/** The interface of class to crud subscribe table */
export interface SubscriptionTableCrud {
	insertSubscription: (email: string, category: string) => Promise<void>;
	deleteSubscription: (email: string, category: string) => Promise<void>;
	querySubscription: (email: string) => Promise<SubscriptionEntry>;
}
