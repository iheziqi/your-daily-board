import {Knex} from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('mensa_info', table => {
      table.string('id').primary();
      table.string('name').notNullable();
      table.string('url').notNullable();
    })
    .createTable('mensa_menu', table => {
      table.string('mensa_id');
      table
        .foreign('mensa_id')
        .references('mensa_info.id')
        .onUpdate('CASCADE')
        .onDelete('SET NULL');
      // use string to store date for convenience.
      // the date is in format YYYY-MM-DD, so the length is 10.
      table.string('date', 10).notNullable();
      table.text('menu').nullable();
      table.primary(['mensa_id', 'date']);
    });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.table('mensa_menu', table => {
    table.dropForeign('mensa_id');
  });
  return knex.schema.dropTable('mensa_info').dropTable('mensa_menu');
}
