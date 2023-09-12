import {Knex} from 'knex';
import {MensaInfoRepository} from '../../repositories';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('mensa_info').del();

  // Inserts seed entries
  const mensaInfoRepository = new MensaInfoRepository(knex);
  await mensaInfoRepository.loadAllMensaInfo();
}
