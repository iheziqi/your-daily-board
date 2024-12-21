import type { Knex } from 'knex';
import path from 'path';

const commonConfig = {
  client: 'better-sqlite3',
  seeds: {
    directory: path.join(__dirname, 'seeds'),
  },
  migrations: {
    extension: 'js',
    tableName: 'knex_migrations',
    directory: [path.join(__dirname, 'migrations')],
  },
  useNullAsDefault: true,
};

const config: { [key: string]: Knex.Config } = {
  production: {
    ...commonConfig,
    connection: {
      filename: path.join(
        __dirname,
        'sqlite/your-daily-board.production.sqlite'
      ),
    },
  },
};

module.exports = config;
