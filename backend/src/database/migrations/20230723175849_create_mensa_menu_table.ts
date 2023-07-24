import {Knex} from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('mensa_info', table => {
      table.string('id').primary();
      table.string('name').notNullable();
    })
    .createTable('mensa_menu', table => {
      table.increments('id');
      table.string('mensa_id');
      table
        .foreign('mensa_id')
        .references('mensa_info.id')
        .onUpdate('CASCADE')
        .onDelete('SET NULL');
      table.date('date').notNullable();
      table.text('menu').nullable();
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('mensa_info').dropTable('mensa_menu');
}
