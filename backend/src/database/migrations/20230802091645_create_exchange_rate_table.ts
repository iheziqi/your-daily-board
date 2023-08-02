import {Knex} from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('exchange_rate', table => {
    table.string('from_to').primary();
    table.date('date');
    table.float('exchange_rate');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('exchange_rate');
}
