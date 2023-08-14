import * as dotenv from 'dotenv';
import * as path from 'path';

/**
 * Configures dotenv files so that in code
 * PROCESS.ENV can be used to read properties in .env.
 */
export function loadEnv(): void {
  const rootPath = path.join(__dirname, '../../');
  const envPath = path.join(rootPath, '.env');

  dotenv.config({path: envPath});
}
