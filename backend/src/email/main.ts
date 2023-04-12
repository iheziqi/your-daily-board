import { EmailLoader } from './assembleEmail';
import { sendEmail } from './sendEmail';
import dotenv from 'dotenv';

dotenv.config();

const testUser = process.env.TEST_RECEIVER as string;

async function sendEmailToUsers() {
	const myLoader = new EmailLoader();
	const users = await myLoader.getAllUsers();
	for (let user of users) {
		const emailHTML = await myLoader.assembleEmailForUser(user);
		sendEmail(user, emailHTML);
	}
}

sendEmailToUsers();
