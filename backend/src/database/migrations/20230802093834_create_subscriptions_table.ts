import {Knex} from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('menu_subscriptions', table => {
      table.integer('user_id').unsigned();
      table
        .foreign('user_id')
        .references('users.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');

      table.string('menu_sub');
      table
        .foreign('menu_sub')
        .references('mensa_info.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');

      table.primary(['user_id', 'menu_sub']);
    })
    .createTable('exchange_rate_subscriptions', table => {
      table.integer('user_id').unsigned();
      table
        .foreign('user_id')
        .references('users.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table;

      table.string('from_to');
      table
        .foreign('from_to')
        .references('exchange_rate.from_to')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

      table.primary(['user_id', 'from_to']);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTable('menu_subscriptions')
    .dropTable('exchange_rate_subscription');
}
