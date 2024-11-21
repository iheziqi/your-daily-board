import { RepoScheduledTasks } from '../../services';

export async function seed(): Promise<void> {
  await RepoScheduledTasks.saveExchangeRateToDatabase();
}
