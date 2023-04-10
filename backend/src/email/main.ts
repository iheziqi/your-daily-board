import { EmailLoader } from './assembleEmail';
import { UserDB, MenuDB, SubscriptionDB } from '../database/database';
import { error, log } from 'console';
import { sendEmail } from './sendEmail';
import dotenv from 'dotenv';

dotenv.config();

const myLoader = new EmailLoader();

let userDB: UserDB;
let menuDB: MenuDB;
let subscribeDB: SubscriptionDB;

// userDB = new UserDB();
// menuDB = new MenuDB();
// subscribeDB = new SubscriptionDB();
const testUser = process.env.TEST_RECEIVER as string;
myLoader
	.assembleEmailForUser(testUser)
	.then((data) => {
		sendEmail(testUser, data);
	})
	.catch((err) => error(err));
