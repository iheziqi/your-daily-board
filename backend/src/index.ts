import KnexService from './database/KnexService';
import {RepoScheduledTasks, ServiceScheduledTasks} from './services/index';
import {getCurrentDate} from './utils/helpers';

async function doScheduledTask(type: string) {
  switch (type) {
    case 'FETCH_DATA':
      await Promise.all([
        RepoScheduledTasks.saveExchangeRateToDatabase,
        RepoScheduledTasks.saveMensaMenusToDatabase,
      ]);
      break;
    case 'SEND_EMAIL':
      await ServiceScheduledTasks.sendDailyBoardEmails('0.0.1');
  }
}

const TASK_TYPE = process.env.TASK_TYPE;

if (!TASK_TYPE) {
  throw new Error('Please enter the right task type.');
}

doScheduledTask(TASK_TYPE)
  .then(() => {
    console.log(`${TASK_TYPE} for ${getCurrentDate()} done!`);
  })
  .catch(e => {
    console.log(e);
  })
  .finally(() => {
    KnexService.destroyInstance();
  });
