import fs from 'fs';

/**
 * Write keys (without values) to a .env file.
 * @param keys - An array of keys to write to the .env file.
 * @param filePath - The path to the .env file. Default is '../.env'.
 */
function writeEnvKeys(keys: string[], filePath = '../.env') {
  // Convert the array of keys into a string with each key on a new line
  const envData = keys.join('\n');

  // Write the data to the .env file
  fs.writeFileSync(filePath, envData);

  console.log(`.env file with keys written to ${filePath}`);
}

// create .env file under root directory
const keysToWrite = [
  'DB_HOST=',
  'DB_PORT=',
  'DB_DATABASE=',
  'DB_USER=',
  'DB_PASSWORD=',
  'DB_TYPE=',
  'SMTP_HOST=',
  'SMTP_PORT=',
  'SMTP_USER=',
  'SMTP_PASS=',
  'SECRET_KEY=',
  'ROOT_URL=',
  'FRONTEND_URL=',
];

writeEnvKeys(keysToWrite);
