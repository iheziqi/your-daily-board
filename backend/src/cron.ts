import CronJobService from './services/CronjobService';
import { RepoScheduledTasks, ServiceScheduledTasks } from './services/index';

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

cronJobService.startJob('FETCH_MENSA_MENU');
cronJobService.startJob('SEND_EMAIL');
