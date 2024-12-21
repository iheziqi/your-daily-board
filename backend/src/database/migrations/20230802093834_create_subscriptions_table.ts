import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  const hasMenuSubscriptions = await knex.schema.hasTable('menu_subscriptions');
  if (!hasMenuSubscriptions) {
    await knex.schema.createTable('menu_subscriptions', table => {
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
    });
  }

  const hasExchangeRateSubscription = await knex.schema.hasTable(
    'exchange_rate_subscriptions'
  );
  if (!hasExchangeRateSubscription) {
    await knex.schema.createTable('exchange_rate_subscriptions', table => {
      table.integer('user_id').unsigned();
      table
        .foreign('user_id')
        .references('users.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');

      table.string('from_to');

      table.primary(['user_id', 'from_to']);
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTableIfExists('exchange_rate_subscriptions')
    .dropTableIfExists('menu_subscriptions');
}
