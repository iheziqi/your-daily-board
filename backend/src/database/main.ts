import { mensaInfo } from './mensa';
import { MenuScraper } from './getMensaMenu';

function getMenusToDatabase() {
	const suedScraper = new MenuScraper(mensaInfo.sued);
	const lmplScraper = new MenuScraper(mensaInfo.lmpl);
	const mohmScraper = new MenuScraper(mensaInfo.mohm);
	const ischScraper = new MenuScraper(mensaInfo.isch);

	const suedMenu = suedScraper.loadMenuToDatabase();
	const lmplMenu = lmplScraper.loadMenuToDatabase();
	const mohmMenu = mohmScraper.loadMenuToDatabase();
	const ischMenu = ischScraper.loadMenuToDatabase();

	return Promise.all([suedMenu, lmplMenu, mohmMenu, ischMenu]);
}

getMenusToDatabase();
