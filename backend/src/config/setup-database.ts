import KnexService from '../database/KnexService';
import { ensureDbDir } from '../database/ensure-database-dir';

ensureDbDir();
const knex = KnexService.getInstance();

async function setupDatabase() {
  const hasMigrations = await knex.schema.hasTable('knex_migrations');
  if (hasMigrations) {
    console.log('Database already initialized. Skipping setup.');
    return;
  }

  console.log(
    '-------------------------- start to run database migration... ----------------------------'
  );
  await knex.migrate.latest();
  console.log(
    '-------------------------- database migration done! ----------------------------'
  );

  console.log(
    '-------------------------- start to load seed data... ----------------------------'
  );
  await knex.seed.run();
  console.log(
    '-------------------------- seed data loaded! ----------------------------'
  );
}

setupDatabase()
  .then(() => {
    console.log('database initial setup successful!');
  })
  .catch(e => {
    console.error(e);
  })
  .finally(() => {
    KnexService.destroyInstance();
  });
