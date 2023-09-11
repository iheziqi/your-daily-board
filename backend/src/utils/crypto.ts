import crypto from 'crypto';
import CryptoJS from 'crypto-js';
import {loadEnv} from './loadEnv';
import createError from 'http-errors';

/**
 * Generates a random key of a specific length (e.g., 256 bits).
 */
export function generateSecretKey() {
  const key = crypto.randomBytes(32).toString('hex');
  console.log('Generated Key:', key);
}

/**
 * Reads secret key from .env file, throws error if it does not exist.
 * @returns
 */
function readSecretKey() {
  loadEnv();
  const secretKey = process.env.SECRET_KEY;
  if (!secretKey) {
    throw createError(500, 'A secret key needed!');
  }
  return secretKey;
}

/**
 * Encrypts a string.
 * @param rawString
 * @returns encrypted string of email address
 */
export function encryptString(rawString: string) {
  const secretKey = readSecretKey();
  const encryptedString = CryptoJS.AES.encrypt(rawString, secretKey).toString();
  return encryptedString;
}

/**
 * Decrypts a string.
 * @param encryptedString
 * @returns decrypted string
 */
export function decryptString(encryptedString: string) {
  const secretKey = readSecretKey();
  const bytes = CryptoJS.AES.decrypt(encryptedString, secretKey);
  const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedString;
}
