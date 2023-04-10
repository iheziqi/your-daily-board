import {
	MenuDB,
	UserDB,
	SubscriptionDB,
} from '../database/database';
import {
	SubscriptionEntry,
	UsersEntry,
	MensaID,
	MenuEntry,
} from '../../database/src/mensa';
import { getCurrentDate } from '../utils/utils';

export class EmailLoader {
	public async assembleEmailForUser(email: string) {
		const categoryEntries = await this.getSubscriptionForUser(email);
		let menus = [];
		for (let entry of categoryEntries) {
			const mensaId: MensaID = entry.category as MensaID;
			const menu = await this.getMenu(mensaId, getCurrentDate());
			menus.push(menu);
		}
		return menus;
	}

	private async getAllUsers(): Promise<UsersEntry> {
		const userDB = new UserDB();
		const users = await userDB.queryUsers();
		userDB.close();
		return users;
	}

	private async getSubscriptionForUser(
		email: string
	): Promise<SubscriptionEntry> {
		const subscriptionDB = new SubscriptionDB();
		const subCategories = await subscriptionDB.querySubscription(email);
		subscriptionDB.close();
		return subCategories;
	}

	private async getMenu(mensaID: MensaID, date: string): Promise<MenuEntry> {
		const menuDB = new MenuDB();
		const menu = await menuDB.queryMenu(mensaID, date);
		return menu;
	}
}
