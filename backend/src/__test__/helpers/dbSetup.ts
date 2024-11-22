import { Knex } from 'knex';
import path from 'path';

import KnexService from '../../database/KnexService';

export async function setupTestDb(): Promise<Knex> {
  // Initialize knex with test config
  const knexInstance = KnexService.getInstance();

  try {
    // Run all migrations
    await knexInstance.migrate.latest();
    return knexInstance;
  } catch (error) {
    await KnexService.destroyInstance();
    throw error;
  }
}

export async function teardownTestDb(knexInstance: Knex): Promise<void> {
  try {
    // Rollback all migrations
    await knexInstance.migrate.rollback({
      directory: path.join(__dirname, '../../database/migrations'),
    });

    // Destroy the connection
    await KnexService.destroyInstance();
  } catch (error) {
    console.error('Error during test database teardown:', error);
    await KnexService.destroyInstance();
    throw error;
  }
}

export async function cleanupTables(knexInstance: Knex): Promise<void> {
  // Disable foreign key checks before deletion
  await knexInstance.raw('PRAGMA foreign_keys = OFF;');

  try {
    // Delete from tables in correct order (children first, then parents)
    const tables = [
      'menu_subscriptions',
      'exchange_rate_subscriptions',
      'mensa_menu',
      'exchange_rate',
      'users_verifying',
      'users',
      'mensa_info',
    ];

    for (const table of tables) {
      await knexInstance(table).del();
    }
  } finally {
    // Re-enable foreign key checks after deletion
    await knexInstance.raw('PRAGMA foreign_keys = ON;');
  }
}
