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
