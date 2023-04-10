import { error } from 'console';
import { UserDB } from '../src/database';
import { resolve } from 'path';

describe('User Table Test', () => {
	let userDB: UserDB;

	beforeAll(() => {
		userDB = new UserDB();
	});

	afterAll(async () => {
    await userDB.clearDatabaseEntries();
    await userDB.clearDatabaseIndex();
		// Close the connection to database;
		userDB.close();
	});

	test('inserts a user', async () => {
		const email = 'test@example.com';
		await userDB.insertUser(email);
		const users = await userDB.queryUsers();
		console.log(users);
		expect(users.some((user) => user.email === email)).toBe(true);
	});

	it('deletes a user', async () => {
		const email = 'test@example.com';
		await userDB.insertUser(email);
		await userDB.deleteUser(email);
		const users = await userDB.queryUsers();
		console.log(users);
		expect(users.some((user) => user.email === email)).toBe(false);
	});

	// it('returns user subscriptions', async () => {
	// 	const email = 'test@example.com';
	// 	const category = 'lunch';
	// 	await userDB.insertUser(email);
	// 	await userDB.subscribe(email, category);
	// 	const subscriptions = await userDB.querySubscriptions(email);
	// 	expect(subscriptions.some((sub) => sub.category === category)).toBe(true);
	// });
});
