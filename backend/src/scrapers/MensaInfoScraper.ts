import {JSDOM} from 'jsdom';
import Scraper from './Scraper';

class MensaInfoScraper {
  private url: string;
  private mensaInfoList: DMensaInfo[] = [];

  constructor(
    url = 'https://www.werkswelt.de/index.php?id=mensen-cafeterien-cafebars'
  ) {
    this.url = url;
  }

  /**
   * Gets all Mensa information.
   * @returns mensaInfoList, null when there is no information.
   */
  public async getAllMensaInfo() {
    try {
      const html = await Scraper.fetchRawHTML(this.url);

      if (!this.hasMensaInfo(html)) {
        return null;
      }

      this.extractMensaInfo(html);

      this.sanitizeName();

      return this.mensaInfoList;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  /**
   * Determine whether the Mensa information exists on the raw html page.
   * @param htmlPage The raw html page.
   * @returns A boolean value of whether the ul element containing all Mensa information exists.
   */
  private hasMensaInfo(htmlPage: string): boolean {
    // Use JSDOM to get the html document object.
    const {document} = new JSDOM(htmlPage).window;

    // Select the specific div with the class "dropdown"
    const specificDropdown = document.querySelector('div.dropdown');

    if (!specificDropdown) {
      return false;
    }

    const firstChild = specificDropdown.firstElementChild;

    // If the first element of the div isn't the
    // <a class="" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-expanded="true" style="cursor: pointer;">
    // Speisepläne<span class="caret"></span></a>
    if (!firstChild || firstChild.getAttribute('id') !== 'dropdownMenu1') {
      return false;
    }

    return true;
  }

  /**
   * Extracts the all Mensa information and stores them in mensaInfo array.
   * @param htmlPage The raw html page.
   */
  private extractMensaInfo(htmlPage: string) {
    // Use JSDOM to get the html document object.
    const {document} = new JSDOM(htmlPage).window;

    // Select the specific div with the class "dropdown"
    const mensaInfoDropdown = document.querySelector('div.dropdown')!;

    // Get all the li elements inside the specificDropdown
    const liElements = mensaInfoDropdown.querySelectorAll(
      'li[role="presentation"]'
    );

    // Loop through each li element and extract the id attribute and text content
    liElements.forEach(li => {
      const linkElement = li.querySelector('a[role="menuitem"]')!;
      // Extract the id value after "?id="
      const idAttribute = linkElement
        .getAttribute('href')!
        .substring(4) as MensaID;
      // Get the text content inside the <a> tag and remove leading/trailing spaces
      const textContentName = linkElement.textContent!.trim();
      // Create an object with id and name properties and push it to the mensaInfoList array
      const item = {
        id: idAttribute,
        name: textContentName,
        url: `https://www.werkswelt.de/index.php?id=${idAttribute}`,
      };
      this.mensaInfoList.push(item);
    });
  }

  /**
   * Sanitizes the mensaInfoList.
   */
  private sanitizeName() {
    this.mensaInfoList = this.mensaInfoList.map(item => {
      let newName = item.name;

      if (newName.startsWith('E-')) {
        // Use a regular expression to handle both cases: space after 'E-' and no space after 'E-'
        newName = newName.replace(/^E-(\s+)?/, 'Erlangen ');
      } else if (newName.startsWith('N-')) {
        // Use a regular expression to handle both cases: space after 'N-' and no space after 'E-'
        newName = newName.replace(/^N-(\s+)?/, 'Nürnberg ');
      }

      return {
        id: item.id,
        name: newName,
        url: item.url,
      };
    });
  }
}

export default MensaInfoScraper;
