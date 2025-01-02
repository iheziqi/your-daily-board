import { JSDOM } from 'jsdom';
import Scraper from './Scraper';

/**
 * Scrapes the exchange rate of given two currencies.
 * @param from_to
 * @returns exchange rate of current from_to
 */
export async function fetchExchangeRate(
  from_to: from_to
): Promise<string | null | undefined> {
  const url = `https://www.google.com/finance/quote/${from_to}`;
  // Gets the raw html of the website.
  const rawHTML = await Scraper.fetchRawHTML(url);

  // Extracts the exchange rate.
  const { document } = new JSDOM(rawHTML).window;
  const currencyRateElement = document.querySelector('.YMlKec.fxKbKc');
  const currencyRate = currencyRateElement?.textContent;

  return currencyRate;
}

/**
 * Gets the from_to list.
 * @returns
 */
export function getFromToCodes() {
  const from_to: from_to[] = ['EUR-CNY', 'USD-CNY'];
  return from_to;
}
