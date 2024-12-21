import KnexService from '../database/KnexService';
import { ensureDbDir } from '../database/ensure-database-dir';

ensureDbDir();
const knex = KnexService.getInstance();

async function setupDatabase() {
  console.log(
    '-------------------------- start to run database migration ----------------------------'
  );
  await knex.migrate.latest();

  console.log(
    '-------------------------- start to load see data ----------------------------'
  );
  await knex.seed.run();
}

setupDatabase()
  .then(() => {
    console.log('database initial setup done!');
  })
  .catch(e => {
    console.error(e);
  })
  .finally(() => {
    KnexService.destroyInstance();
  });
