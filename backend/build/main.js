"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mensa_1 = require("./mensa");
const getMensaMenu_1 = require("./getMensaMenu");
const process_1 = require("process");
const dbPath = `${(0, process_1.cwd)()}/daily-board.sqlite3`;
var MensaID;
(function (MensaID) {
    MensaID["sued"] = "sued";
    MensaID["lmpl"] = "lmpl";
    MensaID["mohm"] = "mohm";
    MensaID["ishc"] = "isch";
})(MensaID || (MensaID = {}));
// const menuDB = new MenuDB(dbPath);
const myScraper = new getMensaMenu_1.MenuScraper(mensa_1.mensaList[2]);
myScraper
    .scrape()
    .then((menu) => {
    if (menu) {
        console.log('there is menu!');
    }
    else {
        console.log('no menu...');
    }
})
    .catch((err) => console.error(err));
