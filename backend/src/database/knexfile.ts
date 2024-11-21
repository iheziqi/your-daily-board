import type { Knex } from 'knex';

const commonConfig = {
  client: 'better-sqlite3',
  seeds: {
    directory: `${__dirname}/seeds`,
  },
  migrations: {
    extension: 'ts',
    tableName: 'knex_migrations',
    directory: [`${__dirname}/migrations`],
  },
  useNullAsDefault: true,
};

const config: { [key: string]: Knex.Config } = {
  development: {
    ...commonConfig,
    connection: {
      filename: `${__dirname}/sqlite/your-daily-board.development.sqlite`,
    },
  },
  test: {
    ...commonConfig,
    connection: {
      filename: `${__dirname}/sqlite/your-daily-board.test.sqlite`,
    },
  },
  production: {
    ...commonConfig,
    connection: {
      filename: `${__dirname}/sqlite/your-daily-board.production.sqlite`,
    },
  },
};

module.exports = config;
