import axios from 'axios';
import jsdom from 'jsdom';
import { Mensa } from './mensa';

const { JSDOM } = jsdom;

/**
 * Gets the given mensa menu as string.
 * @param mensa Mensa object.
 * @returns String of menu in HTML format.
 */
export const getMensaMenu = async (mensa: Mensa) => {
	const { url } = mensa;
	try {
		const response = await axios.get(url);
		// Handle success.
		const data: string = await response.data;
		// Parse HTML and get the menu.
		const menuElement = parseMenuHTML(data)!;
		return menuElement.innerHTML;
	} catch (error) {
		console.error(error);
	}
};

/**
 * Determines whether or not the menu exists.
 * On public holidays and some special days there is no menu.
 * @param htmlPage The html page gets from http request.
 * @returns A boolean value of whether or not the menu exists.
 */
export const hasMenu = (htmlPage: string): boolean => {
	// Use JSDOM to get the html document object.
	const { document } = new JSDOM(htmlPage).window;
	const menuDivElement = document.querySelector(
		'div[style*="border-radius: 4px 4px 0px 0px;"]'
	)!;
	// Get the first child node of the menuDivElement.
	// Here childNodes[1] because the first one is textNode
	// created by line break in HTML structure file.
	// If the first element is a form, it demonstrates that
	// there is no menu today.
	const firstChild = menuDivElement.childNodes[1]!;
	if (firstChild.nodeName === 'FORM') {
		return false;
	}
	return true;
};

/**
 * Parses the html page that gets from http request of mensa website and return the html element including the menu.
 * @param htmlPage The html page gets from http request.
 * @returns The html element including the menu.
 */
const parseMenuHTML = (htmlPage: string): Element => {
	// Use JSDOM to get the menu div element.
	const { window } = new JSDOM(htmlPage, { runScripts: 'outside-only' });

	// Remove all <details> tags, because Gmail client does not support it.
	// Remove the buttons at the bottom of menu.
	window.eval(`
 		  const details = document.getElementsByTagName('details');
      Array.from(details).forEach((item) => {
        item.remove(); 
      })
			const form = document.querySelector('form');
			form.remove();`);

	// Get the menu div element
	const menuDivElement = window.document.querySelector(
		'div[style*="border-radius: 4px 4px 0px 0px;"]'
	);
	if (!menuDivElement) {
		throw new Error('There is no menu!');
	}

	return menuDivElement!;
};
