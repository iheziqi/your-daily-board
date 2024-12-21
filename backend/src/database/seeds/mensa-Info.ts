import { Knex } from 'knex';
import { MensaInfoRepository } from '../../repositories';

export async function seed(knex: Knex): Promise<void> {
  // Inserts seed entries
  const mensaInfoRepository = new MensaInfoRepository(knex);
  const allMensaInfo = await mensaInfoRepository.getAllMensaInfo();

  // Skip insertion when there are mensa info data
  if (Object.keys(allMensaInfo).length > 0) return;

  await mensaInfoRepository.loadAllMensaInfo();
}
