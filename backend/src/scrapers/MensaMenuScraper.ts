import { JSDOM } from 'jsdom';
import { removeNewLines } from '../utils/helpers';
import Scraper from './Scraper';
import { logger } from '../logging/logger';

/**
 * Scrapes the menu of given Mensa.
 */
class MensaMenuScraper {
  /**
   * Gets the menu of given Mensa.
   * If there is no menu today, returns null.
   * @param url The url of Mensa website
   * @returns The menu content inside the container if exists.
   */
  public async getMenu(url: string): Promise<string | null> {
    try {
      const mensaPage = await Scraper.fetchRawHTML(url);
      if (!MensaMenuScraper.hasMenu(mensaPage)) {
        return null;
      }
      return MensaMenuScraper.extractMenu(mensaPage);
    } catch (error) {
      logger.error(error);
      return null;
    }
  }

  /**
   * Determines whether or not the menu exists.
   * Because on weekends and some special days there is no menu.
   * @param htmlPage The Mensa html page got from http request.
   * @returns A boolean value of whether or not the menu exists.
   */
  private static hasMenu(htmlPage: string): boolean {
    // Use JSDOM to get the html document object.
    const { document } = new JSDOM(htmlPage).window;
    const menuDivElement = document.querySelector(
      'div[style*="border-radius: 4px 4px 0px 0px;"]'
    );

    // Get the first child node of the menuDivElement.
    // Here childNodes[1] because the first one is textNode
    // created by line break in HTML structure file.
    // If the first element is a form, it demonstrates that
    // there is no menu today.
    if (!menuDivElement) {
      return false;
    }
    const firstChild = menuDivElement.childNodes[1];
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
  private static extractMenu(htmlPage: string): string {
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

    return removeNewLines(menuDivElement.innerHTML!);
  }
}

export default MensaMenuScraper;
