import { UserDB, clearDatabase } from '../src/database/database';
import { UsersEntry } from '../src/database/mensa';

describe('User Table Test 1', () => {
	let userDB: UserDB;

	beforeAll(() => {
		userDB = new UserDB();
	});

	afterAll(async () => {
		const clear = new clearDatabase(userDB.databaseInstance);
		await clear.clearDatabaseEntries('users');
		await clear.clearDatabaseIndex('users');
		// close the connection to database;
		userDB.close();
	});

	test('deletes a user', async () => {
		const email = 'test@example.com';
		await userDB.insertUser(email);
		await userDB.deleteUser(email);
		const users = await userDB.queryUsers();
		expect(users.length).toBe(0);
	});

	test('inserts a user', async () => {
		const email = 'test@example.com';
		await userDB.insertUser(email);
		const users = await userDB.queryUsers();
		expect(users.some((user) => user.email === email)).toBe(true);
	});
});

describe('User Table Test 2', () => {
	let userDB: UserDB;

	function arraysOfObjectsEqual(arr1: UsersEntry, arr2: UsersEntry) {
		if (arr1.length !== arr2.length) {
			return false;
		}

		const arr1Emails = arr1.map((obj) => obj.email);
		const arr2Emails = arr2.map((obj) => obj.email);

		return arr1Emails.every((email) => arr2Emails.includes(email));
	}
	beforeAll(() => {
		userDB = new UserDB();
	});

	afterAll(async () => {
		const clear = new clearDatabase(userDB.databaseInstance);
		await clear.clearDatabaseEntries('users');
		await clear.clearDatabaseIndex('users');
		// Close the connection to database;
		userDB.close();
	});

	const emailAddresses = [
		{ email: 'testemail001@gmail.com' },
		{ email: 'mytestemail123@yahoo.com' },
		{ email: 'dummyemail456@hotmail.com' },
		{ email: 'trythisemail789@outlook.com' },
		{ email: 'testaccount999@mail.com' },
	];

	test('inserts multiple users', async () => {
		for (let email of emailAddresses) {
			await userDB.insertUser(email.email);
		}
		const users = await userDB.queryUsers();
		expect(arraysOfObjectsEqual(users, emailAddresses)).toBe(true);
	});

	test('deletes multiple users', async () => {
		for (let email of emailAddresses) {
			await userDB.deleteUser(email.email);
		}
		const users = await userDB.queryUsers();
		expect(users.length).toBe(0);
	});
});
