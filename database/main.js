"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils/utils");
const database_1 = require("./database");
const todayMenu = {
    category: 'mohm',
    date: (0, utils_1.getCurrentDate)(),
    menuText: 'this is an random test menu',
};
const menuDB = new database_1.MenuDB('daily-board.sqlite3');
// menuDB.insertMenu(todayMenu);
menuDB.queryMenu('mohm', (0, utils_1.getCurrentDate)());
