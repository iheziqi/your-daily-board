import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // Create users table
  const hasUsers = await knex.schema.hasTable('users');
  if (!hasUsers) {
    await knex.schema.createTable('users', table => {
      table.increments('id').primary();
      table.string('email').notNullable();
      table.unique('email');
      table.boolean('admin');
      table.boolean('is_verified');
    });
  }

  // Create users_verifying table
  const hasUsersVerifying = await knex.schema.hasTable('users_verifying');
  if (!hasUsersVerifying) {
    await knex.schema.createTable('users_verifying', table => {
      table.string('email').primary();
      table
        .foreign('email')
        .references('users.email')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table.string('token');
    });
  }

  // Create users_authentication table
  const hasUsersAuth = await knex.schema.hasTable('users_authentication');
  if (!hasUsersAuth) {
    await knex.schema.createTable('users_authentication', table => {
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
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTableIfExists('users_authentication')
    .dropTableIfExists('users_verifying')
    .dropTableIfExists('users');
}
