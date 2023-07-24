import axios, {AxiosResponse} from 'axios';

class Scraper {
  /** URL string to scrape */
  protected url: string;

  constructor(url: string) {
    this.url = url;
  }

  /**
   * Sends a GET request to target website and gets the raw HTML.
   * @param url The URL of target website
   * @param maxRetries The maximum number of retries (default: 3)
   * @param retryDelay The delay in milliseconds between retries (default: 1000)
   * @returns String of raw HTML page.
   */
  public static async fetchRawHTML(
    url: string,
    maxRetries = 3,
    retryDelay = 1000
  ): Promise<string> {
    for (let retry = 0; retry < maxRetries; retry++) {
      try {
        const response: AxiosResponse<string> = await axios.get(url);

        // Check if the response status code indicates success (2xx).
        if (response.status >= 200 && response.status < 300) {
          const data: string = response.data;
          // Return the HTML page.
          return data;
        } else {
          // If the response status code is not within the success range, throw an error.
          throw new Error(
            `Request to ${url} failed with status code ${response.status}.`
          );
        }
      } catch (error) {
        // Log the error for debugging purposes.
        console.error(
          `Error fetching the HTML page (Attempt ${retry + 1}):`,
          error
        );

        // Wait for the specified delay before retrying the request.
        await new Promise(resolve => setTimeout(resolve, retryDelay));
      }
    }

    // If all retries fail, throw an error.
    throw new Error(
      `Failed to get menu from ${url} after ${maxRetries} retries.`
    );
  }
}

export default Scraper;
