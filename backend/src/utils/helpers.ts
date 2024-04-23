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
 * Function to get an array of dates for the next 30 days with a specific hour
 * and minute, adjusted for the local time zone.
 * @param hour The hour of the day (0-23).
 * @param minute The minute of the hour (0-59).
 * @returns An array of Date objects representing the dates for the next 30 days
 *          with the specified time.
 */
export function getDateOfNext30DaysWithTime(
  hour: number,
  minute: number
): Date[] {
  // Validate input parameters
  if (hour < 0 || hour > 23 || minute < 0 || minute > 59) {
    throw new Error('Invalid hour or minute value');
  }

  // Initialize an empty array to store the dates
  const dates: Date[] = [];

  // Get the current date and time
  const today = new Date();

  // Check if the specified time has already passed for today
  if (
    today.getHours() > hour ||
    (today.getHours() === hour && today.getMinutes() >= minute)
  ) {
    // If it has passed, move to the next day
    today.setDate(today.getDate() + 1);
  }

  // Loop through the next 30 days
  for (let i = 0; i < 30; i++) {
    // Calculate the date for each day by setting the hour and minute,
    // adding the number of milliseconds in a day, and adjusting for the time zone offset
    const nextDate = new Date(
      today.getFullYear(), // Year of current date
      today.getMonth(), // Month of current date
      today.getDate() + i, // Day of current date plus i days
      hour, // Hour
      minute, // Minute
      0, // Second
      0 // Millisecond
    );

    // Adjust for the time zone offset
    nextDate.setMinutes(nextDate.getMinutes() - nextDate.getTimezoneOffset());

    // Push the calculated date into the dates array
    dates.push(nextDate);
  }

  // Return the array of dates for the next 30 days with the specified time
  return dates;
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
