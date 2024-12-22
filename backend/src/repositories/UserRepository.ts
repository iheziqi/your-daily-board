import { Knex } from 'knex';
import crypto from 'crypto';

class UserRepository implements IUserRepository {
  private db: Knex;

  constructor(knexInstance: Knex) {
    this.db = knexInstance;
  }

  /**
   * Create a new user into database.
   * @param userData user's data including email
   * @returns DUser
   */
  public async createUser(userData: DUser): Promise<DUser> {
    const { email } = userData;
    await this.db<DUser>('users').insert({ email });
    return userData;
  }

  /**
   * Gets all users' information from database.
   * @returns all users' information in an array.
   */
  public async getAllUsersData(): Promise<DUser[]> {
    const allUsers = await this.db<DUser>('users').select();
    return allUsers;
  }

  /**
   * Gets user's id by email address.
   * @param email Email address of user
   * @returns User's id in database
   */
  public async getUserIdByEmail(
    email: string
  ): Promise<Pick<DUser, 'id'> | undefined> {
    const user = await this.db<DUser>('users')
      .select('id')
      .where({ email })
      .first();

    return user;
  }

  /**
   * Updates a user's email in database.
   * @param userData oldEmail and newEmail
   * @returns updated email address
   */
  public async updateUserEmail(userData: {
    oldEmail: string;
    newEmail: string;
  }): Promise<string> {
    const { oldEmail, newEmail } = userData;
    await this.db<DUser>('users')
      .where('email', '=', oldEmail)
      .update({ email: newEmail });
    return newEmail;
  }

  /**
   * Deletes a user from database.
   * @param email email of user
   * @returns deleted user's email
   */
  public async deleteUser(email: string): Promise<string> {
    await this.db<DUser>('users').where('email', '=', email).del();
    return email;
  }

  /**
   * Adds an entry to users_verifying table.
   * This table stores to-be-confirmed email address and a token to verify it.
   * @param email
   * @returns generated token
   */
  public async createToBeVerifiedUser(email: string): Promise<string> {
    // Gets a long random string
    const token = crypto.randomUUID();

    await this.db.transaction(async trx => {
      await trx<DUserVerifying>('users_verifying').where({ email }).del();
      await trx<DUserVerifying>('users_verifying').insert({ email, token });
    });

    return token;
  }

  /**
   * Gets verifying token in table users_verifying.
   * @param email
   * @returns token
   */
  public async getVerifyingTokenByUserEmail(
    email: string
  ): Promise<string | undefined> {
    const queryResult = await this.db<DUserVerifying>('users_verifying')
      .select('token')
      .where({ email })
      .first();
    return queryResult?.token;
  }

  /**
   * Gets email address by the given token.
   * @param token
   * @returns email address
   */
  public async getEmailByVerifyingToken(
    token: string
  ): Promise<string | undefined> {
    const queryResult = await this.db<DUserVerifying>('users_verifying')
      .select('email')
      .where({ token })
      .first();
    return queryResult?.email;
  }

  /**
   * Deletes verified use in table users_verifying
   * Changes is_verified to true in table users.
   * @param email
   * @returns deleted email address in table users_verifying
   */
  public async deleteToBeVerifiedUser(email: string): Promise<string> {
    await this.db.transaction(async trx => {
      await trx<DUserVerifying>('users_verifying').where({ email }).del();
      await trx<DUser>('users').where({ email }).update({ is_verified: 1 });
    });
    return email;
  }

  /**
   * Gets is_verified from users table.
   * @param email
   * @returns
   */
  public async isVerifiedEmail(email: string): Promise<number | undefined> {
    const queryResult = await this.db<DUser>('users')
      .select('is_verified')
      .where({ email })
      .first();
    return queryResult?.is_verified;
  }
}

export default UserRepository;
