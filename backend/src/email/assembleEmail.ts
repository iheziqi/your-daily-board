import { MenuDB, UserDB, SubscriptionDB } from '../database/database';
import {
	MensaID,
	SubscriptionEntry,
	MenuEntry,
	MenuObject,
} from '../database/mensa';
import { getCurrentDate } from '../utils/utils';
import {
	blankSpace,
	emailTitle,
	exchangeRateLoader,
	footer,
	menuJumpLink,
	menuLoader,
} from './emailTemplate';
import { removeTabs } from '../utils/utils';

/**
 * Load the contents in database into email template.
 */
export class EmailLoader {
	public async assembleEmailForUser(email: string) {
		const menuObject = await this.getMenuForUser(email);
		const menuIds = Object.keys(menuObject) as MensaID[];
		const menuHtml = menuIds
			.map((id) => {
				return removeTabs(menuLoader(id, menuObject[id] as string));
			})
			.join('');
		const titleHTML = emailTitle();
		const exchangeRateHTML = exchangeRateLoader('7.9999');
		const blankSpaceHTML = blankSpace();
		// const jumpLinkHTML = menuJumpLink();
		const footerHTML = footer();
		const emailHTML = `<!DOCTYPE html>
<html
	xmlns="http://www.w3.org/1999/xhtml"
	xmlns:v="urn:schemas-microsoft-com:vml"
	xmlns:o="urn:schemas-microsoft-com:office:office"
>
	<head>
		<title> </title>
		<!--[if !mso]><!-->
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<!--<![endif]-->
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<style type="text/css">
			#outlook a {
				padding: 0;
			}
			body {
				margin: 0;
				padding: 0;
				-webkit-text-size-adjust: 100%;
				-ms-text-size-adjust: 100%;
			}
			table,
			td {
				border-collapse: collapse;
				mso-table-lspace: 0pt;
				mso-table-rspace: 0pt;
			}
			img {
				border: 0;
				height: auto;
				line-height: 100%;
				outline: none;
				text-decoration: none;
				-ms-interpolation-mode: bicubic;
			}
			p {
				display: block;
				margin: 13px 0;
			}
		</style>
		<!--[if mso]>
			<noscript>
				<xml>
					<o:OfficeDocumentSettings>
						<o:AllowPNG />
						<o:PixelsPerInch>96</o:PixelsPerInch>
					</o:OfficeDocumentSettings>
				</xml>
			</noscript>
		<![endif]-->
		<!--[if lte mso 11]>
			<style type="text/css">
				.mj-outlook-group-fix {
					width: 100% !important;
				}
			</style>
		<![endif]-->

		<!--[if !mso]><!-->
		<link
			href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700"
			rel="stylesheet"
			type="text/css"
		/>
		<link
			href="https://fonts.googleapis.com/css2?family=Albert+Sans:wght@500;900"
			rel="stylesheet"
			type="text/css"
		/>
		<style type="text/css">
			@import url(https://fonts.googleapis.com/css?family=Roboto:300,400,500,700);
			@import url(https://fonts.googleapis.com/css2?family=Albert+Sans:wght@500;900);
		</style>
		<!--<![endif]-->

		<style type="text/css">
			@media only screen and (min-width: 480px) {
				.mj-column-per-100 {
					width: 100% !important;
					max-width: 100%;
				}
			}
		</style>
		<style media="screen and (min-width:480px)">
			.moz-text-html .mj-column-per-100 {
				width: 100% !important;
				max-width: 100%;
			}
		</style>

		<style type="text/css">
			@media only screen and (max-width: 480px) {
				table.mj-full-width-mobile {
					width: 100% !important;
				}
				td.mj-full-width-mobile {
					width: auto !important;
				}
			}
		</style>
		<style type="text/css">
			body {
				background-color: #faf098;
			}
			.bg-none {
				background: none !important;
			}
			.gutter {
				padding-left: 20px !important;
				padding-right: 20px !important;
			}
			@media (min-width: 480px) {
				.gutter {
					padding-left: 32px !important;
					padding-right: 32px !important;
				}
			}

			/* Utility classes */
			.no-wrap {
				white-space: nowrap;
			}
			.hidden {
				display: none;
				max-width: 0px;
				max-height: 0px;
				overflow: hidden;
				mso-hide: all;
			}
			.lg-hidden {
				display: none;
				max-width: 0px;
				max-height: 0px;
				overflow: hidden;
				mso-hide: all;
			}

			@media (min-width: 480px) {
				/* Utility classes */
				.sm-hidden {
					display: none;
					max-width: 0px;
					max-height: 0px;
					overflow: hidden;
					mso-hide: all;
				}
				.lg-hidden {
					display: block !important;
					max-width: none !important;
					max-height: none !important;
					overflow: visible !important;
					mso-hide: none !important;
				}
			}
		</style>
	</head>
	<body style="word-spacing: normal; background-color: #faf098">

		<div style="background-color: #faf098">
      ${titleHTML}
      ${exchangeRateHTML}
      ${blankSpaceHTML}
      ${blankSpaceHTML}
      ${menuHtml}
      ${footerHTML}
		</div>

	</body>
</html>
`;

		return emailHTML;
	}

	/**
	 * Gets the given user's subscribed menu.
	 * @param email The email address of user.
	 * @returns  Menu object in which the Mensa Id is key and menu text is value.
	 */
	public async getMenuForUser(email: string) {
		const categoryEntries = await this.getSubscriptionForUser(email);
		let menusObject: MenuObject = {};
		for (let entry of categoryEntries) {
			const mensaId: MensaID = entry.category as MensaID;
			const menuEntry = await this.getMenu(mensaId, getCurrentDate());
			menusObject[mensaId] = menuEntry[0].menu;
		}
		return menusObject;
	}

	/**
	 * Gets all users in database in array format.
	 * @returns Array of user object. ['example@mail.com', 'example2@mail.com']...
	 */
	public async getAllUsers(): Promise<string[]> {
		const usersArray = [];
		const userDB = new UserDB();
		const users = await userDB.queryUsers();
		for (let user of users) {
			usersArray.push(user.email);
		}
		userDB.close();
		return usersArray;
	}

	/**
	 * Gets all subscriptions for given user in table subscribe.
	 * @param email The email address of user.
	 * @returns
	 */
	private async getSubscriptionForUser(
		email: string
	): Promise<SubscriptionEntry> {
		const subscriptionDB = new SubscriptionDB();
		const subCategories = await subscriptionDB.querySubscription(email);
		subscriptionDB.close();
		return subCategories;
	}

	/**
	 * Gets the menu of given Mensa and date.
	 * @param mensaID
	 * @param date
	 * @returns
	 */
	private async getMenu(mensaID: MensaID, date: string): Promise<MenuEntry> {
		const menuDB = new MenuDB();
		const menu = await menuDB.queryMenu(mensaID, date);
		menuDB.close();
		return menu;
	}
}
