import { UserRepository } from '../../repositories';
import { cleanupTables } from '../helpers/dbSetup';

describe('UserRepository Tests', () => {
  let userRepo: UserRepository;

  // Test data
  const exampleEmail1 = 'example@test.email';
  const exampleEmail2 = 'demo@test.email';
  const exampleEmail3 = 'test@test.email';
  const exampleEmail4 = 'user@test.email';

  beforeAll(() => {
    // Use the global knex instance
    userRepo = new UserRepository(global.__KNEX__);
  });

  beforeEach(async () => {
    // Clean all tables before each test
    await cleanupTables(global.__KNEX__);
  });

  describe('User CRUD Operations', () => {
    it('should create user in database', async () => {
      const user = await userRepo.createUser({ email: exampleEmail1 });
      const queryResult = await global.__KNEX__
        .select()
        .from('users')
        .where('email', '=', exampleEmail1)
        .first();

      expect(user?.email).toBe(exampleEmail1);
      expect(queryResult.email).toBe(exampleEmail1);
    });

    it('should get all users from database', async () => {
      await userRepo.createUser({ email: exampleEmail1 });
      await userRepo.createUser({ email: exampleEmail2 });

      const allUsers = await userRepo.getAllUsersData();

      expect(Array.isArray(allUsers)).toBeTruthy();
      expect(allUsers?.length).toBe(2);
      allUsers?.forEach(user => {
        expect(user.email).toBeTruthy();
      });
    });

    it('should get user id by email', async () => {
      await userRepo.createUser({ email: exampleEmail1 });
      const userId = await userRepo.getUserIdByEmail(exampleEmail1);

      expect(userId).toBeDefined();
      expect(typeof userId?.id).toBe('number');
    });

    it('should return undefined when getting id of non-existent user', async () => {
      const userId = await userRepo.getUserIdByEmail('notexisted@email.test');
      expect(userId).toBeUndefined();
    });

    it('should update user email', async () => {
      await userRepo.createUser({ email: exampleEmail1 });
      const returnedValue = await userRepo.updateUserEmail({
        oldEmail: exampleEmail1,
        newEmail: exampleEmail3,
      });

      const queryResult = await global
        .__KNEX__('users')
        .select()
        .where('email', '=', exampleEmail3)
        .first();

      expect(returnedValue).toEqual(exampleEmail3);
      expect(queryResult.email).toBe(exampleEmail3);
    });

    it('should delete user', async () => {
      // Create a user first
      await userRepo.createUser({ email: exampleEmail1 });

      // Now delete the user
      const returnedValue = await userRepo.deleteUser(exampleEmail1);

      const queryResult = await global
        .__KNEX__('users')
        .select()
        .where('email', '=', exampleEmail1)
        .first();

      expect(returnedValue).toEqual(exampleEmail1);
      expect(queryResult).toBeUndefined();
    });
  });

  describe('User Verification Operations', () => {
    it('should create to-be-verified user', async () => {
      await userRepo.createUser({ email: exampleEmail4 });
      const token = await userRepo.createToBeVerifiedUser(exampleEmail4);

      const queryResult = await global
        .__KNEX__('users_verifying')
        .select()
        .where({ email: exampleEmail4 })
        .first();

      expect(token).toBe(queryResult?.token);
      expect(queryResult?.email).toBe(exampleEmail4);
    });

    it('should get verification token by user email', async () => {
      await userRepo.createUser({ email: exampleEmail4 });
      const createdToken = await userRepo.createToBeVerifiedUser(exampleEmail4);
      const retrievedToken = await userRepo.getVerifyingTokenByUserEmail(
        exampleEmail4
      );

      expect(retrievedToken).toBe(createdToken);
    });

    it('should get email by verification token', async () => {
      await userRepo.createUser({ email: exampleEmail4 });
      const token = await userRepo.createToBeVerifiedUser(exampleEmail4);
      const email = await userRepo.getEmailByVerifyingToken(token);

      expect(email).toBe(exampleEmail4);
    });

    it('should delete to-be-verified user and update verification status', async () => {
      await userRepo.createUser({ email: exampleEmail4 });
      await userRepo.createToBeVerifiedUser(exampleEmail4);
      const email = await userRepo.deleteToBeVerifiedUser(exampleEmail4);

      const verifyingUser = await global
        .__KNEX__('users_verifying')
        .select()
        .where({ email: exampleEmail4 })
        .first();

      const user = await global
        .__KNEX__('users')
        .select('is_verified')
        .where({ email: exampleEmail4 })
        .first();

      expect(email).toBe(exampleEmail4);
      expect(verifyingUser).toBeUndefined();
      expect(user.is_verified).toBeTruthy();
    });
  });
});
