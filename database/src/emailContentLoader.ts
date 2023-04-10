import { UserDB, MenuDB, SubscriptionDB } from './database';
import { MenuScraper } from './getMensaMenu';

class EmailContentLoader {
  private contents: string[];

  constructor() {
    this.contents = [];
  }

  public async loadContent() {
    const subscriptionDB = new SubscriptionDB();
    const userDB = new UserDB();
    const users = await userDB.queryUsers();
    if (users) {
      for (let user of users) {
        console.log (user.);
      }
    }
  }
}