"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuDB = void 0;
const sqlite3_1 = __importDefault(require("sqlite3"));
/**
 * Controls the mensa_menus table in database.
 * The schema of the table:
 * `CREATE TABLE mensa_menus(
 * id INTEGER PRIMARY KEY AUTOINCREMENT,
 * category TEXT NOT NULL,
 * date TEXT NOT NULL,
 * menu TEXT);`
 */
class MenuDB {
    constructor(dbPath) {
        this.db = new sqlite3_1.default.Database(dbPath);
    }
    /**
     * Insert menu into table.
     * @param menu Menu object than stores mensa menu.
     */
    insertMenu(menu) {
        const insert = `INSERT INTO mensa_menus(category, date, menu) VALUES(?, ?, ?);`;
        this.db.run(insert, [menu.category, menu.date, menu.menuText], (err) => {
            if (err) {
                console.error(err.message);
            }
            else {
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
    queryMenu(category, date) {
        const select = `SELECT menu FROM mensa_menus 
      WHERE category='${category}' AND date='${date}';`;
        this.db.all(select, [], (err, rows) => {
            if (err) {
                console.error(err.message);
            }
            else {
                console.log(rows);
            }
        });
    }
}
exports.MenuDB = MenuDB;
