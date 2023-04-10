import sqlite3 from 'sqlite3';
import {
	MensaMenu,
	MensaMenuTableCrud,
	UserTableCrud,
	UsersEntry,
	SubscriptionTableCrud,
	MenuEntry,
	SubscriptionEntry,
} from './mensa';
import { cwd } from 'process';

export const DBPATH = `${cwd()}/daily-board.sqlite3`;

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
	// The path of database file
	private dbPath = DBPATH;

	constructor() {
		this.db = new sqlite3.Database(this.dbPath);
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
	queryMenu(category: string, date: string): Promise<MenuEntry> {
		const select = `SELECT menu FROM mensa_menus WHERE category=? AND date=?;`;
		return new Promise((resolve, reject) => {
			this.db.all(select, [category, date], (err, rows: MenuEntry) => {
				if (err) {
					console.error(err.message);
					reject(err);
				} else {
					resolve(rows);
				}
			});
		});
	}

	/**
	 * Closes the database connection.
	 */
	close(): void {
		this.db.close((err) => {
			if (err) {
				console.error(err);
			}
		});
		console.log('Database connection has been closed successfully!');
	}
}

/**
 * Controls the users table in database.
 * The schema of the table:
 * CREATE TABLE users(
 * id INTEGER PRIMARY KEY AUTOINCREMENT,
 * email TEXT NOT NULL);
 */
export class UserDB {
	// Database instance
	private db: sqlite3.Database;
	// The path of database file
	private dbPath = DBPATH;

	constructor() {
		this.db = new sqlite3.Database(this.dbPath);
	}

	public get databaseInstance(): sqlite3.Database {
		return this.db;
	}

	/**
	 * Queries all users in database.
	 * @returns An array of user objects.
	 */
	async queryUsers(): Promise<UsersEntry> {
		return new Promise((resolve, reject) => {
			const select = `SELECT * FROM users;`;
			this.db.all(select, [], (err, rows: UsersEntry) => {
				if (err) {
					reject(err);
				} else {
					resolve(rows);
				}
			});
		});
	}

	/**
	 * Inserts a user and records email address.
	 * @param email The email address of user.
	 */
	async insertUser(email: string): Promise<void> {
		return new Promise((resolve, reject) => {
			const insert = `INSERT INTO users(email) VALUES(?);`;
			this.db.run(insert, [email], (err) => {
				if (err) {
					reject(err);
				} else {
					console.log(`${email} inserted!`);
					resolve();
				}
			});
		});
	}

	/**
	 * Deletes a user.
	 * @param email The email address of user.
	 */
	async deleteUser(email: string): Promise<void> {
		return new Promise((resolve, reject) => {
			const del = `DELETE FROM users WHERE email = ?;`;
			this.db.run(del, [email], (err) => {
				if (err) {
					reject(err);
				} else {
					console.log(`${email} deleted!`);
					resolve();
				}
			});
		});
	}

	/**
	 * !!! Dangerous !!!
	 * This is only for test purpose.
	 * You will delete all entries in the user table!
	 * @returns
	 */
	async clearDatabaseEntries(): Promise<void> {
		return new Promise((resolve, reject) => {
			this.db.run('DELETE FROM users;', (err) => {
				if (err) {
					reject(err);
				} else {
					console.log('All users have been deleted from users table!');
					resolve();
				}
			});
		});
	}

	/**
	 * !!! Dangerous !!!
	 * This is only for test purpose.
	 * You will delete all indexes in the user table!
	 * @returns
	 */
	async clearDatabaseIndex(): Promise<void> {
		return new Promise((resolve, reject) => {
			this.db.run('DELETE FROM sqlite_sequence WHERE name="users";', (err) => {
				if (err) {
					reject(err);
				} else {
					console.log('All indexes have been deleted from users table!');
					resolve();
				}
			});
		});
	}

	/**
	 * Closes the database connection.
	 */
	close(): void {
		this.db.close((err) => {
			if (err) {
				console.error(err);
			}
		});
		console.log('Database connection has been closed successfully!');
	}
}

export class SubscriptionDB implements SubscriptionTableCrud {
	// The database instance
	private db: sqlite3.Database;
	// The path of database file
	private dbPath = DBPATH;

	constructor() {
		this.db = new sqlite3.Database(this.dbPath);
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
	 * @returns Promise<SubscriptionEntry | null>
	 */
	querySubscription(email: string): Promise<SubscriptionEntry> {
		return new Promise((resolve, reject) => {
			const select = `SELECT * FROM subscribe WHERE email = ?`;
			this.db.all(select, [email], (err, rows: SubscriptionEntry) => {
				if (err) {
					console.error(err.message);
					reject(err);
				} else {
					resolve(rows);
				}
			});
		});
	}

	/**
	 * Closes the database connection.
	 */
	close(): void {
		this.db.close((err) => {
			if (err) {
				console.error(err);
			}
		});
		console.log('Database connection has been closed successfully!');
	}
}
