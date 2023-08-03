import {JSDOM} from 'jsdom';
import Scraper from './Scraper';

export async function fetchExchangeRate(from_to: string) {
  try {
    const url = `https://www.google.com/finance/quote/${from_to}`;
    // Gets the raw html of the website.
    const rawHTML = await Scraper.fetchRawHTML(url);

    // Extracts the exchange rate.
    const {document} = new JSDOM(rawHTML).window;
    const element = document.querySelector('.YMlKec.fxKbKc')!;
    const currencyRate = element.textContent;

    return currencyRate;
  } catch (error) {
    console.log(error);
    return null;
  }
}
