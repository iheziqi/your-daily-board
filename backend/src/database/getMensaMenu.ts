import axios from 'axios';
import jsdom from 'jsdom';
import { Mensa } from './mensa';

const { JSDOM } = jsdom;

/**
 * Scrapes the menu of given Mensa.
 */
export class MenuScraper {
	private mensa: Mensa;
	public mensaID: string;

	constructor(mensa: Mensa) {
		this.mensa = mensa;
		this.mensaID = mensa['id'];
	}

	/**
	 * Gets the menu of given Mensa.
	 * If there is no menu today, returns null.
	 * @returns The menu content inside the container if exists.
	 */
	public async scrape(): Promise<string | null> {
		try {
			const mensaPage = await this.getMensaMenu(this.mensa);
			if (!this.hasMenu(mensaPage as string)) {
				return null;
			}
			return this.parseMenuHTML(mensaPage);
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	/**
	 * Gets the given mensa menu as string.
	 * @param mensa Mensa object.
	 * @returns String of menu in HTML format.
	 */
	private async getMensaMenu(mensa: Mensa): Promise<string> {
		const { url } = mensa;
		try {
			const response = await axios.get(url)!;
			// Handle success.
			const data: string = await response.data!;
			// Return the html page.
			return data;
		} catch (error) {
			return new (Promise as any).reject(
				new Error('Fail to get Studierendenwerk page.')
			);
		}
	}

	/**
	 * Determines whether or not the menu exists.
	 * On public holidays and some special days there is no menu.
	 * @param htmlPage The html page gets from http request.
	 * @returns A boolean value of whether or not the menu exists.
	 */
	private hasMenu(htmlPage: string): boolean {
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
	}

	/**
	 * Parses the html page that gets from http request of mensa website and return the html element including the menu.
	 * @param htmlPage The html page gets from http request.
	 * @returns The innerHTML inside the container of html the menu.
	 */
	private parseMenuHTML(htmlPage: string): string {
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
		)!;

		return menuDivElement.innerHTML!;
	}
}
