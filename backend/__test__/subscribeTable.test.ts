import {
	MenuDB,
	SubscriptionDB,
	UserDB,
	clearDatabase,
} from '../src/database/database';
import { MensaMenu, MenuEntry, SubscriptionEntry } from '../src/database/mensa';

const emailAddresses = [
	{ email: 'testemail001@gmail.com' },
	{ email: 'mytestemail123@yahoo.com' },
	{ email: 'dummyemail456@hotmail.com' },
	{ email: 'trythisemail789@outlook.com' },
	{ email: 'testaccount999@mail.com' },
];

const allCategoriesChecker = [
	{ email: 'test@test.com', category: 'sued' },
	{ email: 'test@test.com', category: 'lmpl' },
	{ email: 'test@test.com', category: 'mohm' },
	{ email: 'test@test.com', category: 'isch' },
];
const menuData: MensaMenu[] = [
	{ category: 'sued', date: '2023-04-10', menuText: 'test menu for sued' },
	{ category: 'lmpl', date: '2023-04-10', menuText: 'test menu for lmpl' },
	{ category: 'mohm', date: '2023-04-10', menuText: 'test menu for mohm' },
	{ category: 'isch', date: '2023-04-10', menuText: 'test menu for isch' },
];

function hasAllCategories(
	categoriesToCheck: SubscriptionEntry,
	categories: SubscriptionEntry
): boolean {
	const categorySet = new Set(categoriesToCheck.map((item) => item.category));
	return categories.every((item) => categorySet.has(item.category));
}

describe('subscribe table test 1', () => {
	let userDB: UserDB;
	let menuDB: MenuDB;
	let subscribeDB: SubscriptionDB;

	beforeAll(async () => {
		userDB = new UserDB();
		menuDB = new MenuDB();
		subscribeDB = new SubscriptionDB();

		// Inserts some value to database.

		for (let email of emailAddresses) {
			await userDB.insertUser(email.email);
		}
		for (let menu of menuData) {
			await menuDB.insertMenu(menu);
		}
		for (let email of emailAddresses) {
			for (let menu of menuData) {
				await subscribeDB.insertSubscription(email.email, menu.category);
			}
		}
	});

	afterAll(async () => {
		const myClearDatabase = new clearDatabase(userDB.databaseInstance);
		await myClearDatabase.clearDatabaseEntries('users');
		await myClearDatabase.clearDatabaseEntries('mensa_menus');
		await myClearDatabase.clearDatabaseEntries('subscribe');
		await myClearDatabase.clearDatabaseIndex('users');
		await myClearDatabase.clearDatabaseIndex('mensa_menus');
		await myClearDatabase.clearDatabaseIndex('subscribe');
	});

	test("get all user's subscription", async () => {
		for (let email of emailAddresses) {
			const subscriptions = await subscribeDB.querySubscription(email.email);
			expect(hasAllCategories(subscriptions, allCategoriesChecker)).toBe(true);
		}
	});
});
