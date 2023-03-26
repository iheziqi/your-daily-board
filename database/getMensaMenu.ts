import axios from 'axios';
import jsdom from 'jsdom';
import { Mensa } from './mensaList';

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
		const data: string = response.data;
		// Parse HTML and get the menu.
		const menuElement = parseMenuHTML(data);
		return menuElement?.innerHTML;
	} catch (error) {
		console.error(error);
	}
};

/**
 * Parses the html page that gets from http request of mensa website and return the html element including the menu. 
 * @param htmlPage The html page gets from http request.
 * @returns The html element including the menu. 
 */
const parseMenuHTML = (htmlPage: string): Element | null => {
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
	const mensaDivElement = window.document.querySelector(
		'div[style*="border-radius: 4px 4px 0px 0px;"]'
	);
	console.log(mensaDivElement?.innerHTML);

	return mensaDivElement;
};
