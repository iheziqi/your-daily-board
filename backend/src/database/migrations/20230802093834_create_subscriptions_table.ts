import {Knex} from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('subscriptions', table => {
    table.integer('user_id').unsigned();
    table
      .foreign('user_id')
      .references('users.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table.string('menu_sub').nullable();
    table
      .foreign('menu_sub')
      .references('mensa_info.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table.string('exchange_rate_sub').nullable();
    table
      .foreign('exchange_rate_sub')
      .references('exchange_rate.from_to')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('subscriptions');
}
