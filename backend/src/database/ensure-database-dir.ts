import fs from 'fs';
import path from 'path';

export function ensureDbDir(): void {
  const dbDir = path.join(__dirname, 'sqlite');
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }
}
