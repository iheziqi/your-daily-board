import {Knex} from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', table => {
    table.increments('id').primary();
    table.string('email').notNullable();
    table.unique('email');
    table.boolean('admin').defaultTo(false);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users');
}
