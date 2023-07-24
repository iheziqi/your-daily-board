import * as dotenv from 'dotenv';
import * as path from 'path';

export function loadEnv(): void {
  const rootPath = path.join(__dirname, '../../');
  const envPath = path.join(rootPath, '.env');

  dotenv.config({path: envPath});
}
