import sqlite3 from 'sqlite3';
import { MensaMenu } from './main';
import { getCurrentDate } from './utils/utils';

interface MensaMenuTableCrud {
	insertMenu: (menu: MensaMenu) => void;
	queryMenu: (category: string, date: string) => void;
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
				console.log('Data inserted');
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
	queryMenu(category: string, date: string) {
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
