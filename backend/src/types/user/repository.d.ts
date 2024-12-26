/**
 * user repository
 */
interface IUserRepository {
  // Creates a new user.
  createUser(userData: DUser): Promise<DUser>;

  // Gets all users' data from database.
  getAllUsersData(): Promise<DUser[]>;

  // Gets user's id by email.
  getUserIdByEmail(email: string): Promise<Pick<DUser, 'id'> | undefined>;

  // Updates a user's email.
  updateUserEmail(userData: {
    oldEmail: string;
    newEmail: string;
  }): Promise<string>;

  // Deletes a user from database.
  deleteUser(email: string): Promise<string>;

  // Creates verifying token to confirm the email address.
  createToBeVerifiedUser(email: string): Promise<string>;

  // Gets verifying token
  getVerifyingTokenByUserEmail(email: string): Promise<string | undefined>;

  // Gets email address by token
  getEmailByVerifyingToken(token: string): Promise<string | undefined>;

  // Deletes verified use in table users_verifying.
  deleteToBeVerifiedUser(email: string): Promise<string>;

  isVerifiedEmail(email: string): Promise<number | undefined>;
}
