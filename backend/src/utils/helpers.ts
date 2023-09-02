/**
 * Gets the current date in the format of YYYY-MM-DD.
 * For example, getCurrentDate() might return the string '2023-03-26' for March 26, 2023.
 * @returns Current date in the format of YYYY-MM-DD.
 */
export function getCurrentDate(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const formattedMonth = month < 10 ? `0${month}` : `${month}`;
  const formattedDay = day < 10 ? `0${day}` : `${day}`;
  return `${year}-${formattedMonth}-${formattedDay}`;
}

/**
 * Removes all new line characters \n from a given string.
 * @param str
 * @returns
 */
export function removeNewLines(str: string): string {
  return str.replace(/\n/g, '');
}

/**
 * Get the previous day (yesterday) of a given date.
 *
 * @param {string} dateString - The input date in 'YYYY-MM-DD' format.
 * @returns {string} The previous day in 'YYYY-MM-DD' format.
 */
export function getPreviousDay(dateString: string): string {
  const currentDate = new Date(dateString);
  currentDate.setDate(currentDate.getDate() - 1);

  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const day = currentDate.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
}
