import {Knex} from 'knex';
import {encryptString, decryptString} from '../utils/crypto';

class UserRepository implements IUserRepository {
  private db: Knex;

  constructor(knexInstance: Knex) {
    this.db = knexInstance;
  }

  /**
   * Create a new user into database.
   * @param userData user's data including email
   * @returns userDate object
   */
  public async createUser(userData: DUser): Promise<DUser | undefined> {
    try {
      const {email} = userData;
      await this.db('users').insert({email});
      return userData;
    } catch (error) {
      console.error(
        'An error occurred when inserting a new user into database.',
        error
      );
      return;
    }
  }

  /**
   * Gets all users' information from database.
   * @returns all users' information in an array.
   */
  public async getAllUsersEmail(): Promise<DUser[] | undefined> {
    try {
      const allUsers = await this.db.select().from('users');
      return allUsers;
    } catch (error) {
      console.error(
        'An error occurred when getting all users from database.',
        error
      );
      return;
    }
  }

  /**
   * Gets user's id by email address.
   * @param email Email address of user
   * @returns User's id in database
   */
  public async getUserIdByEmail(
    email: string
  ): Promise<Pick<DUser, 'id'> | undefined> {
    try {
      const user = await this.db
        .select('id')
        .from<DUser>('users')
        .where({email})
        .first();

      return user;
    } catch (error) {
      console.error("An error occurred when getting user's id.", error);
      return;
    }
  }

  /**
   * Updates a user's email to database.
   * @param userData oldEmail and newEmail
   * @returns updated email address
   */
  public async updateUserEmail(userData: {
    oldEmail: string;
    newEmail: string;
  }): Promise<string | undefined> {
    try {
      const {oldEmail, newEmail} = userData;
      await this.db('users')
        .where('email', '=', oldEmail)
        .update({email: newEmail});
      return newEmail;
    } catch (error) {
      console.error(
        'An error occurred when updating a user to database.',
        error
      );
      return;
    }
  }

  /**
   * Deletes a user from database.
   * @param email email of user
   * @returns deleted user's email
   */
  public async deleteUser(email: string): Promise<string | undefined> {
    try {
      await this.db('users').where('email', '=', email).del();
      return email;
    } catch (error) {
      console.error(
        'An error occurred when deleting a user from database.',
        error
      );
      return;
    }
  }

  /**
   * Adds an entry to users_verifying table.
   * This table stores to be confirmed email address and a token to verify it.
   * @param email
   * @returns generated token
   */
  public async createToBeVerifiedUser(
    email: string
  ): Promise<string | undefined> {
    try {
      // Gets a long string by encrypting the email address.
      const token = encryptString(email);

      await this.db('users_verifying').insert({email, token});

      return token;
    } catch (error) {
      console.log(
        'An error occurred when adding an entry to users_verifying',
        error
      );
      return;
    }
  }

  /**
   * Gets verifying token in table users_verifying.
   * @param email
   * @returns token
   */
  public async getVerifyingTokenByUserEmail(
    email: string
  ): Promise<string | undefined> {
    try {
      const queryResult = await this.db('users_verifying')
        .select('token')
        .where({email})
        .first();
      return queryResult.token;
    } catch (error) {
      console.log(
        'An error occurred when getting token from users_verifying',
        error
      );
      return;
    }
  }

  /**
   * Deletes verified use in table users_verifying.
   * @param email
   * @returns deleted email address in table users_verifying
   */
  public async deleteToBeVerifiedUser(
    email: string
  ): Promise<string | undefined> {
    try {
      await this.db('users_verifying').where('email', '=', email).del();
      return email;
    } catch (error) {
      console.error(
        'An error occurred when deleting a user from users_verifying.',
        error
      );
      return;
    }
  }
}

export default UserRepository;
