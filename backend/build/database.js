"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionDB = exports.UserDB = exports.MenuDB = void 0;
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
    queryMenu(category, date) {
        const select = `SELECT menu FROM mensa_menus WHERE category=? AND date=?;`;
        return new Promise((resolve, reject) => {
            this.db.all(select, [category, date], (err, rows) => {
                if (err) {
                    console.error(err.message);
                    reject(err);
                }
                else {
                    resolve(rows);
                }
            });
        });
    }
}
exports.MenuDB = MenuDB;
/**
 * Controls the users table in database.
 * The schema of the table:
 * CREATE TABLE users(
 * id INTEGER PRIMARY KEY AUTOINCREMENT,
 * email TEXT NOT NULL);
 */
class UserDB {
    constructor(dbPath) {
        this.db = new sqlite3_1.default.Database(dbPath);
    }
    /**
     * Inserts a user and records email address.
     * @param email The email address of user.
     */
    insertUser(email) {
        const insert = `INSERT INTO users(email) VALUES(?);`;
        this.db.run(insert, [email], (err) => {
            if (err) {
                console.error(err.message);
            }
            else {
                console.log('User inserted');
            }
        });
    }
    /**
     * Deletes a user.
     * @param email The email address of user.
     */
    deleteUser(email) {
        const del = `DELETE FROM users WHERE email = ?;`;
        this.db.run(del, [email], (err) => {
            if (err) {
                console.error(err.message);
            }
            else {
                console.log('User deleted');
            }
        });
    }
}
exports.UserDB = UserDB;
class SubscriptionDB {
    constructor(dbPath) {
        this.db = new sqlite3_1.default.Database(dbPath);
    }
    /**
     * Insert the relation of email and category.
     * @param email String of email
     * @param category The name of mensa
     */
    insertSubscription(email, category) {
        const insert = `INSERT INTO subscribe(email, category) VALUES(?,?); `;
        this.db.run(insert, [email, category], (err) => {
            if (err) {
                console.error(err.message);
            }
            else {
                console.log('Subscription inserted.');
            }
        });
    }
    /**
     * Delete the relation of email and category.
     * @param email String of email
     * @param category The name of mensa
     */
    deleteSubscription(email, category) {
        const del = `DELETE FROM subscribe WHERE email = ? AND category = ?`;
        this.db.run(del, [email, category], (err) => {
            if (err) {
                console.error(err.message);
            }
            else {
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
    querySubscription(email) {
        return new Promise((resolve, reject) => {
            const select = `SELECT * FROM subscribe WHERE email = ?`;
            this.db.all(select, [email], (err, rows) => {
                if (err) {
                    console.error(err.message);
                    reject(err);
                }
                else {
                    resolve(rows);
                }
            });
        });
    }
}
exports.SubscriptionDB = SubscriptionDB;
