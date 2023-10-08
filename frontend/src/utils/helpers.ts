/* eslint-disable import/prefer-default-export */

/**
 * Validate the given email address.
 * @param email
 * @returns boolean representing whether the email address is valid
 */
export function validEmailAddress(email: string) {
  // Simple email validation using a regular expression
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

export function classifyMensas(mensaInfo: MensaInfo) {
  const classifiedMensas: {
    [k: string]: MensaInfo | Record<string, never>;
  } = { Nürnberg: {}, Erlangen: {}, Other: {} };

  const mensaIds = Object.keys(mensaInfo) as Array<keyof MensaInfo>;

  mensaIds.forEach((id) => {
    const mensa = mensaInfo[id];
    const { name } = mensa;
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
