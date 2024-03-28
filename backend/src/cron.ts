import KnexService from './database/KnexService';
import CronJobService from './services/CronjobService';
import {RepoScheduledTasks, ServiceScheduledTasks} from './services/index';
import {getCurrentDate} from './utils/helpers';
import {getNurembergToMunichTrainPlanIn30Days} from './scrapers/DBTrainScraper';

type scheduledTasks = 'FETCH_MENSA_MENU' | 'SEND_EMAIL';

async function doScheduledTask(type: scheduledTasks) {
  switch (type) {
    case 'FETCH_MENSA_MENU':
      await Promise.all([
        RepoScheduledTasks.saveExchangeRateToDatabase(),
        RepoScheduledTasks.saveMensaMenusToDatabase(),
      ]);
      break;
    case 'SEND_EMAIL':
      await ServiceScheduledTasks.sendDailyBoardEmails('0.0.1');
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

cronJobService.addJob('FETCH_TRAIN_TICKET_PRICE', {
  schedule: '0 * * * *',
  task: async () => {
    await getNurembergToMunichTrainPlanIn30Days().catch(e => {
      console.error(e.message);
    });
  },
  onComplete: null,
});

cronJobService.startJob('FETCH_MENSA_MENU');
cronJobService.startJob('FETCH_MENSA');
cronJobService.startJob('FETCH_TRAIN_TICKET_PRICE');
