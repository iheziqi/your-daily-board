import {JSDOM} from 'jsdom';
import {removeNewLines} from '../utils/helpers';
import Scraper from './Scraper';

/**
 * Scrapes the menu of given Mensa.
 */
class MensaMenuScraper extends Scraper {
  constructor(url: string) {
    super(url);
  }

  /**
   * Gets the menu of given Mensa.
   * If there is no menu today, returns null.
   * @returns The menu content inside the container if exists.
   */
  public async getMenu(): Promise<string | null> {
    try {
      const mensaPage = await MensaMenuScraper.fetchRawHTML(this.url);
      if (!this.hasMenu(mensaPage)) {
        return null;
      }
      return this.parseMenuHTML(mensaPage);
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  /**
   * Determines whether or not the menu exists.
   * Because on weekends and some special days there is no menu.
   * @param htmlPage The Mensa html page got from http request.
   * @returns A boolean value of whether or not the menu exists.
   */
  private hasMenu(htmlPage: string): boolean {
    // Use JSDOM to get the html document object.
    const {document} = new JSDOM(htmlPage).window;
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
   * Parses the html page got from mensa website and returns the menu html element.
   * @param htmlPage The Mensa html page got from http request.
   * @returns The innerHTML inside the container of html the menu.
   */
  private parseMenuHTML(htmlPage: string): string {
    // Use JSDOM to get the menu div element.
    const {window} = new JSDOM(htmlPage, {runScripts: 'outside-only'});

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

    return removeNewLines(menuDivElement.innerHTML!);
  }
}

export default MensaMenuScraper;
