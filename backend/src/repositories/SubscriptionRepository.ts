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
}

export default SubscriptionRepository;
