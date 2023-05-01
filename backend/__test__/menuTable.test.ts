import { MenuDB, clearDatabase } from '../src/database/database';
import { MenuEntry, mensaList, MensaMenu } from '../src/database/mensa';

describe('MenuDB Test 1', () => {
	let menuDB: MenuDB;

	beforeAll(() => {
		menuDB = new MenuDB();
	});

	afterAll(async () => {
		const clear = new clearDatabase(menuDB.databaseInstance);
		await clear.clearDatabaseEntries('mensa_menus');
		await clear.clearDatabaseIndex('mensa_menus');
		// close the connection to database;
		menuDB.close();
	});

	// Insert menu test case
	test('insertMenu should insert a new menu into the database', async () => {
		const menu: MensaMenu = {
			category: 'Test',
			date: '2023-04-10',
			menuText: 'Test menu',
		};
		await menuDB.insertMenu(menu);
		const result: MenuEntry = await menuDB.queryMenu(menu.category, menu.date);
		expect(result[0].menu).toBe(menu.menuText);
	});

	// Query menu test case
	test('queryMenu should return the menu for the given category and date', async () => {
		const menu = {
			category: 'Test',
			date: '2023-04-10',
			menuText: 'Test menu',
		};
		const result = await menuDB.queryMenu(menu.category, menu.date);
		expect(result[0].menu).toBe(menu.menuText);
	});
});
