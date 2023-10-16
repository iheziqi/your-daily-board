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

/**
 * Converts a Unix timestamp to a JavaScript Date object.
 *
 * @param {number} unixTimestamp - The Unix timestamp in seconds.
 * @returns {Date} The corresponding JavaScript Date object.
 */
export function unixTimestampToDate(unixTimestamp: number): Date {
  const timestampInMilliseconds = unixTimestamp * 1000;
  return new Date(timestampInMilliseconds);
}

/**
 * Converts a JavaScript Date object to a Unix timestamp.
 *
 * @param {Date} date - The JavaScript Date object.
 * @returns {number} The Unix timestamp in seconds.
 */
export function dateToUnixTimestamp(date: Date): number {
  const timestampInSeconds = date.getTime() / 1000;
  return Math.floor(timestampInSeconds);
}

/**
 * Classifies mensa info according to the places.
 * @param mensaInfo
 * @returns
 */
export function classifyMensas(mensaInfo: Record<MensaID, MensaInfo>) {
  const classifiedMensas: {
    [k: string]: Record<MensaID, MensaInfo> | Record<string, never>;
  } = {Nürnberg: {}, Erlangen: {}, Other: {}};

  const mensaIds = Object.keys(mensaInfo) as Array<
    keyof Record<MensaID, MensaInfo>
  >;

  mensaIds.forEach(id => {
    const mensa = mensaInfo[id];
    const {name} = mensa;
    // Get the first word as the prefix
    const prefix = name.split(' ')[0];

    if (prefix === 'Nürnberg') {
      classifiedMensas.Nürnberg[id] = mensa;
    } else if (prefix === 'Erlangen') {
      classifiedMensas.Erlangen[id] = mensa;
    } else {
      classifiedMensas.Other[id] = mensa;
    }
  });

  return classifiedMensas;
}
