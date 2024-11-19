import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('db_train_ticket_price', table => {
    table.increments('id').primary();
    table.string('start_station');
    table.string('dest_station');
    table.string('train_name');
    table.timestamp('departure_time');
    table.timestamp('arrive_time');
    table.timestamp('timestamp').defaultTo(knex.fn.now());
    table.float('price', 8, 4);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('db_train_ticket_price');
}
