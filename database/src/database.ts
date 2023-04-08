import sqlite3 from 'sqlite3';
import { MensaMenu } from './mensa';

interface MensaMenuTableCrud {
	insertMenu: (menu: MensaMenu) => void;
	queryMenu: (category: string, date: string) => void;
}

interface UserTableCrud {
	insertUser: (email: string) => void;
	deleteUser: (email: string) => void;
}

type SubscriptionEntry = { email: string; category: string }[];

interface SubscriptionTableCrud {
	insertSubscription: (email: string, category: string) => void;
	deleteSubscription: (email: string, category: string) => void;
	querySubscription: (email: string) => Promise<SubscriptionEntry | null>;
}

/**
 * Controls the mensa_menus table in database.
 * The schema of the table:
 * `CREATE TABLE mensa_menus(
 * id INTEGER PRIMARY KEY AUTOINCREMENT,
 * category TEXT NOT NULL,
 * date TEXT NOT NULL,
 * menu TEXT);`
 */
export class MenuDB implements MensaMenuTableCrud {
	// The database instance
	private db: sqlite3.Database;

	constructor(dbPath: string) {
		this.db = new sqlite3.Database(dbPath);
	}

	/**
	 * Insert menu into table.
	 * @param menu Menu object than stores mensa menu.
	 */
	insertMenu(menu: MensaMenu): void {
		const insert = `INSERT INTO mensa_menus(category, date, menu) VALUES(?, ?, ?);`;
		this.db.run(insert, [menu.category, menu.date, menu.menuText], (err) => {
			if (err) {
				console.error(err.message);
			} else {
				console.log('Menu inserted');
			}
		});
	}

	/**
	 * Query menu on condition of category and date.
	 * Category is the string id of mensa.
	 * Date is in the format like YYYY-MM-DD.
	 * Use util function to get this format of date.
	 * @param category
	 * @param date
	 */
	queryMenu(category: string, date: string): void {
		const select = `SELECT menu FROM mensa_menus 
      WHERE category='${category}' AND date='${date}';`;

		this.db.all(select, [], (err, rows) => {
			if (err) {
				console.error(err.message);
			} else {
				console.log(rows);
			}
		});
	}
}

/**
 * Controls the users table in database.
 * The schema of the table:
 * CREATE TABLE users(
 * id INTEGER PRIMARY KEY AUTOINCREMENT,
 * email TEXT NOT NULL);
 */
export class UserDB implements UserTableCrud {
	/** Database instance */
	private db: sqlite3.Database;

	constructor(dbPath: string) {
		this.db = new sqlite3.Database(dbPath);
	}

	/**
	 * Inserts a user and records email address.
	 * @param email The email address of user.
	 */
	insertUser(email: string): void {
		const insert = `INSERT INTO users(email) VALUES(?);`;
		this.db.run(insert, [email], (err) => {
			if (err) {
				console.error(err.message);
			} else {
				console.log('User inserted');
			}
		});
	}

	/**
	 * Deletes a user.
	 * @param email The email address of user.
	 */
	deleteUser(email: string): void {
		const del = `DELETE FROM users WHERE email = ?;`;
		this.db.run(del, [email], (err) => {
			if (err) {
				console.error(err.message);
			} else {
				console.log('User deleted');
			}
		});
	}
}

export class SubscriptionDB implements SubscriptionTableCrud {
	// The database instance
	private db: sqlite3.Database;

	constructor(dbPath: string) {
		this.db = new sqlite3.Database(dbPath);
	}

	/**
	 * Insert the relation of email and category.
	 * @param email String of email
	 * @param category The name of mensa
	 */
	insertSubscription(email: string, category: string): void {
		const insert = `INSERT INTO subscribe(email, category) VALUES(?,?); `;
		this.db.run(insert, [email, category], (err) => {
			if (err) {
				console.error(err.message);
			} else {
				console.log('Subscription inserted.');
			}
		});
	}

	/**
	 * Delete the relation of email and category.
	 * @param email String of email
	 * @param category The name of mensa
	 */
	deleteSubscription(email: string, category: string): void {
		const del = `DELETE FROM subscribe WHERE email = ? AND category = ?`;
		this.db.run(del, [email, category], (err) => {
			if (err) {
				console.error(err.message);
			} else {
				console.log(' deleted');
			}
		});
	}

	/**
	 * Get the relation of user and mensa category.
	 * The result is like [
	 * { email: 'test1@gmail.com', category: 'mohm' },
	 * { email: 'test2gmail.com', category: 'sued' }
	 * ]
	 * If there is no corresponding entry, return null.
	 * @param email The string of email
	 */
	querySubscription(email: string): Promise<SubscriptionEntry | null> {
		return new Promise((resolve, reject) => {
			const select = `SELECT * FROM subscribe WHERE email = ?`;
			this.db.all(select, [email], (err, rows: SubscriptionEntry | null) => {
				if (err) {
					console.error(err.message);
					reject(err);
				} else {
					resolve(rows);
				}
			});
		});
	}
}
