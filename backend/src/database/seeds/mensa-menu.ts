import {
  MensaInfoRepository,
  MensaMenuDishesRepository,
  MensaMenuRepository,
} from '../../repositories';
import MensaMenuScraper from '../../scrapers/MensaMenuScraper';
import { RepoScheduledTasks } from '../../services';
import KnexService from '../KnexService';

export async function seed(): Promise<void> {
  const knex = KnexService.getInstance();
  await RepoScheduledTasks.saveMensaMenusToDatabase(
    new MensaInfoRepository(knex),
    new MensaMenuRepository(knex),
    new MensaMenuDishesRepository(knex),
    new MensaMenuScraper()
  );
}
