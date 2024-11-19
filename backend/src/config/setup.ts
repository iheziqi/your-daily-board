import { exec } from 'child_process';

import KnexService from '../database/KnexService';
import { RepoScheduledTasks } from '../services';
import { seed } from '../database/seeds/mensaInfo';

/**
 * Runs database migration files.
 */
function runDatabaseMigration() {
  return new Promise<void>((resolve, reject) => {
    // Define the command
    const commandToRun = 'npm run knex migrate:latest';

    // Define the working directory path
    const workingDirectory = `${__dirname}/../../`;

    // Execute the command with the specified working directory
    exec(commandToRun, { cwd: workingDirectory }, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        reject(error);
        return;
      }

      if (stderr) {
        console.info(`Command stderr: ${stderr}`);
        reject(stderr);
        return;
      }

      console.info(`Command output: ${stdout}`);
      resolve();
    });
  });
}

/**
 * Runs database migration files.
 */
function rollbackDatabaseMigration() {
  return new Promise<void>((resolve, reject) => {
    // Define the command
    const commandToRun = 'npm run knex migrate:rollback --all';

    // Define the working directory path
    const workingDirectory = `${__dirname}/../../`;

    // Execute the command with the specified working directory
    exec(commandToRun, { cwd: workingDirectory }, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        reject(error);
        return;
      }

      if (stderr) {
        console.error(`Command stderr: ${stderr}`);
        reject(stderr);
        return;
      }

      console.info(`Command output: ${stdout}`);
      resolve();
    });
  });
}

/**
 * Sets seed data.
 */
function setSeedsData() {
  return new Promise<void>((resolve, reject) => {
    const knexInstance = KnexService.getInstance();

    seed(knexInstance)
      .then(() => {
        return RepoScheduledTasks.saveExchangeRateToDatabase();
      })
      .then(() => {
        return RepoScheduledTasks.saveMensaMenusToDatabase();
      })
      .then(() => {
        console.info('MensaInfo, exchange rates, and mensa menus loaded');
        resolve();
      })
      .catch(e => {
        console.error(e);
        reject(e);
      })
      .finally(() => {
        KnexService.destroyInstance();
      });
  });
}

// Now, run the functions one by one in a synchronized way using Promises
console.info('Start to run database migration');
runDatabaseMigration()
  .then(() => {
    console.info('Migration finished!');
    console.info('------------------------------------------------');
    console.info('Start to load seeds data');
    return setSeedsData();
  })
  .then(() => {
    console.info('Seeds loaded!');
    console.info('------------------------------------------------');
  })
  .catch(error => {
    console.error('An error occurred:', error);
  });
