import fs from 'fs';
import { generateSecretKey } from '../utils/crypto';

/**
 * Write keys (without values) to a .env file.
 * @param keys - An array of keys to write to the .env file.
 * @param filePath - The path to the .env file. Default is the same level as package.json.
 */
function writeEnvKeys(keys: string[], filePath = `${__dirname}/../../.env`) {
  // Convert the array of keys into a string with each key on a new line
  const envData = keys.join('\n');

  // Write the data to the .env file
  fs.writeFileSync(filePath, envData);

  console.log(`.env file with keys written to ${filePath}`);
}

// create .env file under root directory
const keysToWrite = [
  'SMTP_HOST=',
  'SMTP_PORT=',
  'SMTP_USER=',
  'SMTP_PASS=',
  `SECRET_KEY=${generateSecretKey()}`,
  'ROOT_URL=',
  'FRONTEND_URL=',
  'NODE_ENV=',
];

writeEnvKeys(keysToWrite);
