import {Knex} from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('exchange_rate', table => {
    table.string('from_to').primary();
    table.string('date');
    table.float('exchange_rate', 8, 4);
    table.float('change_from_yesterday', 8, 4);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('exchange_rate');
}
