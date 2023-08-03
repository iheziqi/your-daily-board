import UserRepository from '../repositories/UserRepository';
import KnexService from '../database/KnexService';

const knexInstance = KnexService.getInstance();
const myUserRepo = new UserRepository(knexInstance);

// test data
const exampleEmail1 = 'example@test.email';
const exampleEmail2 = 'demo@test.email';
const exampleEmail3 = 'test@test.email';

beforeAll(async () => {
  // deletes all entries in users table.
  await knexInstance('users').del();
});

afterAll(async () => {
  // deletes all entries in users table.
  await knexInstance('users').del();
  // resets increments to 1.
  await knexInstance.raw('ALTER TABLE users AUTO_INCREMENT = 1');
  // closes the knex connection to database.
  KnexService.destroyInstance();
});

describe('user repository unit tests', () => {
  it('should create user into database', async () => {
    const user = await myUserRepo.createUser({email: exampleEmail1});
    const queryResult = await knexInstance
      .select()
      .from('users')
      .where('email', '=', exampleEmail1)
      .first();

    // User given should be returned
    expect(user?.email).toBe(exampleEmail1);

    // queried email should be the exactly same one as given
    expect(queryResult.email).toBe(exampleEmail1);
  });

  it('should get all users from database', async () => {
    await knexInstance('users').insert({email: exampleEmail2});

    const allUsers = await myUserRepo.getAllUsersEmail();

    // Returned value should be an array.
    expect(Array.isArray(allUsers)).toBeTruthy();
    // The length of returned array should be 2
    expect(allUsers?.length).toBe(2);

    // The email should be in the returned object.
    if (allUsers && allUsers?.length > 0) {
      for (const user of allUsers) {
        expect(user.email).toBeTruthy();
      }
    }
  });

  it('should update the user', async () => {
    const returnedValue = await myUserRepo.updateUserEmail({
      oldEmail: exampleEmail1,
      newEmail: exampleEmail3,
    });

    const queryResult = await knexInstance('users')
      .select()
      .where('email', '=', exampleEmail3)
      .first();

    // returned value should be the new email.
    expect(returnedValue).toEqual(exampleEmail3);
    // updated user info should be in database.
    expect(queryResult).toBeTruthy();
    expect(queryResult.email).toBe(exampleEmail3);
  });

  it('should delete the user', async () => {
    const returnedValue = await myUserRepo.deleteUser(exampleEmail3);

    const queryResult = await knexInstance('users')
      .select()
      .where('email', '=', exampleEmail3)
      .first();

    // returned value should be the email of deleted user
    expect(returnedValue).toEqual(exampleEmail3);
    // deleted user shouldn't exist in database
    expect(queryResult).toBeUndefined();
  });
});
