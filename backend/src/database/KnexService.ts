import type {Knex} from 'knex';
import {knex} from 'knex';
// import {config} from './knexfile';
import {loadEnv} from '../utils/loadEnv';

loadEnv();

/**
 * A service class for managing the Knex instance.
 */
class KnexService {
  /** The singleton Knex instance. */
  private static knexInstance: Knex | null = null;

  /** Private constructor to prevent direct instantiation. */
  private constructor() {}

  /**
   * Get the Knex instance. If it doesn't exist, create one and store it for reuse.
   * @returns {Knex} The Knex instance.
   */
  static getInstance(): Knex {
    if (!KnexService.knexInstance) {
      KnexService.knexInstance = knex(
        require('./knexfile')[process.env.DB_TYPE || 'development']
      );
    }

    return KnexService.knexInstance;
  }

  /**
   * Close the Knex instance.
   */
  static destroyInstance() {
    if (KnexService.knexInstance) {
      KnexService.knexInstance.destroy();
    }
  }
}

export default KnexService;
