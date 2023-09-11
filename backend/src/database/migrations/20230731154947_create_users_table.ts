import {Knex} from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('users', table => {
      table.increments('id').primary();
      table.string('email').notNullable();
      table.unique('email');
      table.boolean('admin').defaultTo(false);
      table.boolean('is_verified').defaultTo(false);
    })
    .createTable('users_verifying', table => {
      table.string('email').primary();
      table
        .foreign('email')
        .references('users.email')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table.string('token');
    })
    .createTable('users_authentication', table => {
      table.string('email').primary();
      table
        .foreign('email')
        .references('users.email')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table.integer('authentication_code');
      table.integer('expiration_timestamp');
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTable('users_authentication')
    .dropTable('users_verifying')
    .dropTable('users');
}
