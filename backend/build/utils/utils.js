"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentDate = void 0;
/**
 * Gets the current date in the format of YYYY-MM-DD.
 * For example, getCurrentDate() might return the string '2023-03-26' for March 26, 2023.
 * @returns Current date in the format of YYYY-MM-DD.
 */
function getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const formattedMonth = month < 10 ? `0${month}` : `${month}`;
    const formattedDay = day < 10 ? `0${day}` : `${day}`;
    return `${year}-${formattedMonth}-${formattedDay}`;
}
exports.getCurrentDate = getCurrentDate;
//# sourceMappingURL=utils.js.map