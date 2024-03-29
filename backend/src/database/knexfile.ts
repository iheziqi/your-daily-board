import type {Knex} from 'knex';
import 'dotenv/config';
import {loadEnv} from '../utils/loadEnv';

loadEnv();

const config: {[key: string]: Knex.Config} = {
  development: {
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT!, 10),
      database: process.env.DB_DATABASE,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
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
