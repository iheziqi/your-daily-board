import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  const hasMensaMenuDishes = await knex.schema.hasTable('mensa_menu_dishes');
  if (!hasMensaMenuDishes) {
    await knex.schema.createTable('mensa_menu_dishes', table => {
      table.increments('id').primary();
      table.integer('menu_id').unsigned().notNullable();
      table.string('dish_name').notNullable();
      table.string('dish_category').notNullable();

      table
        .foreign('menu_id')
        .references('mensa_menu.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');

      // Index on menu_id for better join performance
      table.index(['menu_id']);
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('mensa_menu_dishes');
}
