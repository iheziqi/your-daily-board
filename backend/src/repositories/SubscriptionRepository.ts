import {Knex} from 'knex';
import UserRepository from './UserRepository';

class SubscriptionRepository implements ISubscriptionRepository {
  private db: Knex;
  private userRepo: UserRepository;

  constructor(knexInstance: Knex) {
    this.db = knexInstance;
    this.userRepo = new UserRepository(knexInstance);
  }

  /**
   * Creates a subscription of exchange rate for user.
   * @param email Email address of user
   * @param from_to Exchange rate type
   * @returns Created exchange rate subscription
   */
  public async createExchangeRateSubscription(
    email: string,
    from_to: from_to
  ): Promise<DExchangeRateSubscription | null> {
    try {
      // Gets user id by email.
      const user = await this.userRepo.getUserIdByEmail(email);

      // Inserts subscription.
      if (user) {
        await this.db('exchange_rate_subscriptions').insert({
          user_id: user.id,
          from_to: from_to,
        });
        return {user_id: user.id!, from_to: from_to};
      } else {
        console.log(`User with email ${email} not found.`);
        return null;
      }
    } catch (error) {
      console.error(
        'An error occurred while creating exchange rate subscription:',
        error
      );
      return null;
    }
  }

  /**
   * Creates a subscription of Mensa menu for user.
   * @param email Email address of user
   * @param mensaId ID of Mensa
   * @returns Created menu subscription
   */
  public async createMensaMenuSubscription(
    email: string,
    mensaId: MensaID
  ): Promise<DMensaMenuSubscription | null> {
    try {
      // Gets user id by email.
      const user = await this.userRepo.getUserIdByEmail(email);

      // Inserts subscription.
      if (user) {
        await this.db('menu_subscriptions').insert({
          user_id: user.id,
          mensa_id: mensaId,
        });
        return {user_id: user.id!, mensa_id: mensaId};
      } else {
        console.log(`User with email ${email} not found.`);
        return null;
      }
    } catch (error) {
      console.error(
        'An error occurred while creating exchange rate subscription:',
        error
      );
      return null;
    }
  }

  /**
   * Gets exchange rate subscriptions of given user.
   * @param email Email address of user
   * @returns List of from_to representing the user's exchange rate subscriptions
   */
  public async getExchangeRateSubscriptionsByUserEmail(
    email: string
  ): Promise<from_to[] | undefined> {
    try {
      // Gets user id by email.
      const user = await this.userRepo.getUserIdByEmail(email);

      if (user) {
        let subscriptions = await this.db
          .select('from_to')
          .from<DExchangeRateSubscription>('exchange_rate_subscriptions')
          .where({user_id: user.id});

        subscriptions = subscriptions.map(sub => {
          return sub.from_to;
        });

        return subscriptions;
      } else {
        console.log(`User with email ${email} not found.`);
        return;
      }
    } catch (error) {
      console.error(
        'An error occurred while getting exchange rate subscription:',
        error
      );
      return;
    }
  }

  /**
   * Gets menu subscriptions of given user.
   * @param email Email address of user
   * @returns List of Mensa id representing the user's menu subscriptions
   */
  public async getMensaMenuSubscriptionsByUserEmail(
    email: string
  ): Promise<MensaID[] | undefined> {
    try {
      // Gets user id by email.
      const user = await this.userRepo.getUserIdByEmail(email);

      if (user) {
        let subscriptions = await this.db
          .select('mensa_id')
          .from<DExchangeRateSubscription>('menu_subscriptions')
          .where({user_id: user.id});

        subscriptions = subscriptions.map(sub => {
          return sub.mensa_id;
        });

        return subscriptions;
      } else {
        console.log(`User with email ${email} not found.`);
        return;
      }
    } catch (error) {
      console.error(
        'An error occurred while creating exchange rate subscription:',
        error
      );
      return;
    }
  }

  /**
   * Gets all subscribed exchange rates of the given user.
   * @param email The Email address of user
   * @returns
   */
  public async getUserSubscribedExchangeRates(
    email: string
  ): Promise<DExchangeRate[]> {
    const exchangeRatesQuery = this.db
      .select(
        'er.from_to',
        'er.date',
        'er.exchange_rate',
        'er.change_from_yesterday'
      )
      .from<DExchangeRate>('exchange_rate AS er')
      .join(
        'exchange_rate_subscriptions AS ers',
        'er.from_to',
        '=',
        'ers.from_to'
      )
      .join('users AS u', 'ers.user_id', '=', 'u.id')
      .where('u.email', email);

    return exchangeRatesQuery;
  }

  /**
   * Gets all subscribed mensa menus of the given user.
   * @param email The email address of user
   */
  public async getUserSubscribedMensaMenusOfToday(
    email: string
  ): Promise<DMensaMenu[]> {
    const mensaMenusQuery = this.db
      .select('mm.mensa_id', 'mm.date', 'mm.menu')
      .from<DMensaMenu>('mensa_menu as mm')
      .join('menu_subscriptions as ms', 'mm.mensa_id', '=', 'ms.mensa_id')
      .join('users as u', 'ms.user_id', 'u.id')
      .where('u.email', email);

    return mensaMenusQuery;
  }
}

export default SubscriptionRepository;
