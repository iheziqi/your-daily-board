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

      table.string('mensa_id');
      table
        .foreign('mensa_id')
        .references('mensa_info.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');

      table.primary(['user_id', 'mensa_id']);
    })
    .createTable('exchange_rate_subscriptions', table => {
      table.integer('user_id').unsigned();
      table
        .foreign('user_id')
        .references('users.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.string('from_to');
      table
        .foreign('from_to')
        .references('exchange_rate.from_to')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

      table.primary(['user_id', 'from_to']);
    })
    .then(() => {
      return knex.raw('SHOW CREATE TABLE exchange_rate_subscriptions');
    })
    .then(result => {
      console.log(result[0]);
    })
    .catch(err => {
      console.error(err);
    });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.table('menu_subscriptions', table => {
    table.dropForeign('user_id');
    table.dropForeign('mensa_id');
  });
  await knex.schema.table('exchange_rate_subscriptions', table => {
    table.dropForeign('user_id');
    table.dropForeign('from_to');
  });
  return knex.schema
    .dropTable('menu_subscriptions')
    .dropTable('exchange_rate_subscriptions');
}
