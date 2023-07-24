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
