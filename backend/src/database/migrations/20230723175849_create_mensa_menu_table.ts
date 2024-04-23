import {Knex} from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('mensa_info', table => {
      table.string('id').primary();
      table.string('name').notNullable();
      table.string('url').notNullable();
    })
    .createTable('mensa_menu', table => {
      table.string('mensa_id').notNullable();
      table.foreign('mensa_id').references('mensa_info.id').onUpdate('CASCADE');
      // use string to store date for convenience.
      // the date is in format YYYY-MM-DD, so the length is 10.
      table.string('date', 10).notNullable();
      table.text('menu').nullable();
      table.primary(['mensa_id', 'date']);
    });
}

export async function down(knex: Knex): Promise<void> {
  // Check if the mensa_menu table exists before attempting to alter it
  const mensaMenuTableExists = await knex.schema.hasTable('mensa_menu');
  if (mensaMenuTableExists) {
    // Drop foreign key constraint from mensa_menu table first
    await knex.schema.alterTable('mensa_menu', table => {
      table.dropForeign(['mensa_id']);
    });
  }

  // The order of dropping tables is important.
  // Since mensa_menu has a foreign key constraint referencing mensa_info,
  // it should be dropped first to avoid foreign key constraint violations.
  return await knex.schema
    .dropTableIfExists('mensa_menu')
    .dropTableIfExists('mensa_info');
}
