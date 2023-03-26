"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMensaMenu = void 0;
const axios_1 = __importDefault(require("axios"));
const jsdom_1 = __importDefault(require("jsdom"));
const { JSDOM } = jsdom_1.default;
/**
 * Gets the given mensa menu as string.
 * @param mensa Mensa object.
 * @returns String of menu in HTML format.
 */
const getMensaMenu = (mensa) => __awaiter(void 0, void 0, void 0, function* () {
    const { url } = mensa;
    try {
        const response = yield axios_1.default.get(url);
        // Handle success.
        const data = response.data;
        // Parse HTML and get the menu.
        const menuElement = parseMenuHTML(data);
        return menuElement === null || menuElement === void 0 ? void 0 : menuElement.innerHTML;
    }
    catch (error) {
        console.error(error);
    }
});
exports.getMensaMenu = getMensaMenu;
/**
 * Parses the html page that gets from http request of mensa website and return the html element including the menu.
 * @param htmlPage The html page gets from http request.
 * @returns The html element including the menu.
 */
const parseMenuHTML = (htmlPage) => {
    // Use JSDOM to get the menu div element.
    const { window } = new JSDOM(htmlPage, { runScripts: 'outside-only' });
    // Remove all <details> tags, because Gmail client does not support it.
    window.eval(`
 		  const details = document.getElementsByTagName('details');
      Array.from(details).forEach((item) => {
        item.remove(); 
      })
			const form = document.querySelector('form');
			form.remove();`);
    // Get the menu div element
    const mensaDivElement = window.document.querySelector('div[style*="border-radius: 4px 4px 0px 0px;"]');
    console.log(mensaDivElement === null || mensaDivElement === void 0 ? void 0 : mensaDivElement.innerHTML);
    return mensaDivElement;
};
