import type {Knex} from 'knex';
import 'dotenv/config';
import {loadEnv} from '../utils/loadEnv';

loadEnv();

const config: {[key: string]: Knex.Config} = {
  development: {
    client: 'mysql2',
    connection: {
      host: process.env.MYSQL_HOST,
      database: process.env.MYSQL_DATABASE,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
    },
    seeds: {
      directory: './seeds',
    },
    migrations: {
      extension: 'ts',
      tableName: 'knex_migrations',
      directory: ['./migrations'],
    },
  },
};

module.exports = config;
