import Scraper from '../../scrapers/Scraper';
import axios from 'axios'; // Import axios for accessing the mocked instance.

// Create a mock axios for testing purpose.
jest.mock('axios');
// Create a type declaration for the mocked axios instance.
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('MenuScraper', () => {
  // Arrange
  const mockedResponseData = '<html><body>Mocked HTML</body></html>';
  const url = 'https://example.com/mensa';

  it('should fetch the menu successfully', async () => {
    // Set up the mocked axios.get behavior.
    mockedAxios.get.mockResolvedValueOnce({
      status: 200,
      data: mockedResponseData,
    });

    // Act
    const html = await Scraper.fetchRawHTML(url);

    // Assert
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(html).toContain(mockedResponseData);
  });

  it('should retry and fetch the menu after multiple attempts', async () => {
    // Mock Axios to simulate a failed request on the first two attempts.
    mockedAxios.get.mockRejectedValueOnce({
      status: 404,
      data: 'not found',
    });
    mockedAxios.get.mockResolvedValueOnce({
      status: 301,
      data: 'moved permanently',
    });
    mockedAxios.get.mockResolvedValueOnce({
      status: 200,
      data: mockedResponseData,
    });

    // Retry 3 times with a delay of 1000ms between retries.
    const menu = await Scraper.fetchRawHTML(url, 3, 100);

    // Assert that the menu contains the expected HTML content after retries.
    expect(menu).toContain(mockedResponseData);

    // Ensure that the axios.get function was called exactly 3 times (initial attempt + 2 retries).
    expect(mockedAxios.get).toHaveBeenCalledTimes(4);
  });

  it('should throw an error after all retries fail', async () => {
    // Mock Axios to simulate multiple failed requests.
    mockedAxios.get.mockRejectedValue(new Error('Request failed'));

    // Ensure that the function throws an error after all retries fail.
    await expect(Scraper.fetchRawHTML(url, 3, 100)).rejects.toThrowError(
      `Failed to get menu from ${url} after 3 retries.`
    );

    // Ensure that the axios.get function was called exactly 3 times (maximum retries).
    expect(mockedAxios.get).toHaveBeenCalledTimes(7);
  });
});
