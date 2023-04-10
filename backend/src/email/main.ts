import { EmailLoader } from './assembleEmail';
import { MensaMenu } from '../database/mensa';
import { UserDB, MenuDB, SubscriptionDB } from '../database/database';

const myLoader = new EmailLoader();
const emailAddresses = [
	{ email: 'testemail001@gmail.com' },
	{ email: 'mytestemail123@yahoo.com' },
	{ email: 'dummyemail456@hotmail.com' },
	{ email: 'trythisemail789@outlook.com' },
	{ email: 'testaccount999@mail.com' },
];

const menuData: MensaMenu[] = [
	{ category: 'sued', date: '2023-04-10', menuText: 'test menu for sued' },
	{ category: 'lmpl', date: '2023-04-10', menuText: 'test menu for lmpl' },
	{ category: 'mohm', date: '2023-04-10', menuText: 'test menu for mohm' },
	{ category: 'isch', date: '2023-04-10', menuText: 'test menu for isch' },
];

let userDB: UserDB;
let menuDB: MenuDB;
let subscribeDB: SubscriptionDB;

userDB = new UserDB();
menuDB = new MenuDB();
subscribeDB = new SubscriptionDB();

// Inserts some value to database.
(async () => {
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
})();
// myLoader.assembleEmailForUser('');
