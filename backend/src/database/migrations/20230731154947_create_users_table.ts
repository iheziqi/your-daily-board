import {Knex} from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('users', table => {
      table.increments('id').primary();
      table.string('email').notNullable();
      table.unique('email');
      table.boolean('admin').defaultTo(false);
      table.boolean('verified').defaultTo(false);
    })
    .createTable('users_verifying', table => {
      table.string('email').primary();
      table.foreign('email').references('users.email');
      table.string('token');
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users');
}
