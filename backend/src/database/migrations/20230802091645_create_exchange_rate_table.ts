import {Knex} from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('exchange_rate', table => {
    table.string('from_to');
    // use string to store date for convenience.
    // the date is in format YYYY-MM-DD, so the length is 10.
    table.string('date', 10);
    table.float('exchange_rate', 8, 4);
    table.float('change_from_yesterday', 8, 4);

    table.primary(['from_to', 'date']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('exchange_rate');
}
