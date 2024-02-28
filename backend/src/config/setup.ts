import mysql from 'mysql2';
import {exec} from 'child_process';
import KnexService from '../database/KnexService';
import {RepoScheduledTasks} from '../services';
import {seed} from '../database/seeds/mensaInfo';
import {loadEnv} from '../utils/loadEnv';

loadEnv();

/**
 * Creates database in MySQL if the database does not exist.
 */
function createDatabaseIfNotExisted() {
  return new Promise<void>((resolve, reject) => {
    const connection = mysql.createConnection({
      host: process.env.DB_HOST || '127.0.0.1',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD,
    });

    // Connect to the MySQL server.
    connection.connect(err => {
      if (err) {
        console.error('Error connecting to MySQL:', err);
        reject(err);
      } else {
        console.log('Connected to MySQL server');
      }
    });

    // Create the database using a SQL query.
    const dbName = 'your_daily_board';

    connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`, err => {
      if (err) {
        console.error('Error creating database:', err);
        reject(err);
      } else {
        console.log(`Database '${dbName}' created successfully.`);
        resolve();
        // Close the MySQL connection
        connection.end();
      }
    });
  });
}

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
    exec(commandToRun, {cwd: workingDirectory}, (error, stdout, stderr) => {
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

      console.log(`Command output: ${stdout}`);
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
    exec(commandToRun, {cwd: workingDirectory}, (error, stdout, stderr) => {
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

      console.log(`Command output: ${stdout}`);
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
        console.log('MensaInfo, exchange rates, and mensa menus loaded');
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
console.log('Start to create database');
createDatabaseIfNotExisted()
  .then(() => {
    console.log('Database created!');
    console.log('------------------------------------------------');
    console.log('Start to run database migration');
    return runDatabaseMigration();
  })
  .then(() => {
    console.log('Migration finished!');
    console.log('------------------------------------------------');
    console.log('Start to load seeds data');
    return setSeedsData();
  })
  .then(() => {
    console.log('Seeds loaded!');
    console.log('------------------------------------------------');
  })
  .catch(error => {
    console.error('An error occurred:', error);
  });
