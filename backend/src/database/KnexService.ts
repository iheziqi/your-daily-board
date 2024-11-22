import type { Knex } from 'knex';
import { knex } from 'knex';
import { loadEnv } from '../utils/loadEnv';

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
    loadEnv();
    if (!KnexService.knexInstance) {
      KnexService.knexInstance = knex(
        require('./knexfile')[process.env.NODE_ENV || 'development']
      );
    }

    return KnexService.knexInstance;
  }

  /**
   * Close the Knex instance.
   */
  static async destroyInstance(): Promise<void> {
    if (KnexService.knexInstance) {
      await KnexService.knexInstance.destroy();
      KnexService.knexInstance = null;
    }
  }
}

export default KnexService;
