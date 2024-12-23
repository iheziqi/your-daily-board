import KnexService from './database/KnexService';
import {
  MensaInfoRepository,
  SubscriptionRepository,
  UserRepository,
} from './repositories';
import CronJobService from './services/CronjobService';
import {
  RenderService,
  RepoScheduledTasks,
  ServiceScheduledTasks,
  EmailServiceFactory,
} from './services';
import { getDirPathOfEmailTemplate } from './views/emails/v1/render';

type scheduledTasks = 'FETCH_MENSA_MENU' | 'SEND_EMAIL';

const knexInstance = KnexService.getInstance();

const serviceScheduledTasks = new ServiceScheduledTasks(
  new UserRepository(knexInstance),
  EmailServiceFactory.getInstance().getEmailService(),
  new RenderService(
    getDirPathOfEmailTemplate(),
    new SubscriptionRepository(knexInstance),
    new MensaInfoRepository(knexInstance)
  )
);

async function doScheduledTask(type: scheduledTasks) {
  switch (type) {
    case 'FETCH_MENSA_MENU':
      await Promise.all([
        RepoScheduledTasks.saveExchangeRateToDatabase(),
        RepoScheduledTasks.saveMensaMenusToDatabase(),
      ]);
      break;
    case 'SEND_EMAIL':
      await serviceScheduledTasks.sendDailyBoardEmails('0.0.1');
  }
}

const cronJobService = CronJobService.getInstance();

cronJobService.addJob('FETCH_MENSA_MENU', {
  schedule: '0 10 * * 1-5',
  task: async () => {
    await doScheduledTask('FETCH_MENSA_MENU').catch(e => {
      console.error(e.message);
    });
  },
  onComplete: null,
});

cronJobService.addJob('SEND_EMAIL', {
  schedule: '30 10 * * 1-5',
  task: async () => {
    await doScheduledTask('SEND_EMAIL').catch(e => {
      console.error(e.message);
    });
  },
  onComplete: null,
});

cronJobService.startJob('FETCH_MENSA_MENU');
cronJobService.startJob('SEND_EMAIL');
