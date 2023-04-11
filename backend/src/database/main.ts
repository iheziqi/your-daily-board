import { MensaMenu, mensaList } from './mensa';
import { MenuScraper } from './getMensaMenu';
import { MenuDB, UserDB, SubscriptionDB } from './database';

enum Mensen {
	'sued',
	'lmpl',
	'mohm',
	'isch',
}

function getMenusToDatabase() {
	const suedScraper = new MenuScraper(mensaList[Mensen.sued]);
	const lmplScraper = new MenuScraper(mensaList[Mensen.lmpl]);
	const mohmScraper = new MenuScraper(mensaList[Mensen.mohm]);
	const ischScraper = new MenuScraper(mensaList[Mensen.isch]);

	const suedMenu = suedScraper.scrape();
	const lmplMenu = lmplScraper.scrape();
	const mohmMenu = mohmScraper.scrape();
	const ischMenu = ischScraper.scrape();

	return Promise.all([suedMenu, lmplMenu, mohmMenu, ischMenu]);
}

getMenusToDatabase()
	.then((data) => {
		console.log('Got all Mensa menu!');
		console.log(data);
	})
	.catch((err) => console.error(err));
