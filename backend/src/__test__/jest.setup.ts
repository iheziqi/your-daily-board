import { Knex } from 'knex';
import { setupTestDb, teardownTestDb } from './helpers/dbSetup';

declare global {
  // eslint-disable-next-line no-var
  var __KNEX__: Knex;
}

beforeAll(async () => {
  // Set longer timeout for migration operations
  jest.setTimeout(30000);
  global.__KNEX__ = await setupTestDb();
});

afterAll(async () => {
  if (global.__KNEX__) {
    await teardownTestDb(global.__KNEX__);
  }
});
