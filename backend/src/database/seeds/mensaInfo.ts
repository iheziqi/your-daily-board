import {Knex} from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('mensa_info').del();

  // Inserts seed entries
  await knex('mensa_info').insert([
    {
      id: 'lmpl',
      name: 'Erlangen Langemarckplatz',
      url: 'https://www.werkswelt.de/index.php?id=lmpl',
    },
    {
      id: 'sued',
      name: 'Erlangen Südmensa',
      url: 'https://www.werkswelt.de/index.php?id=sued',
    },
    {
      id: 'cafeteria-kochstrasse',
      name: 'Erlangen Kochstraße',
      url: 'https://www.werkswelt.de/index.php?id=cafeteria-kochstrasse',
    },
    {
      id: 'isch',
      name: 'Nürnberg Insel Schütt',
      url: 'https://www.werkswelt.de/index.php?id=isch',
    },
    {
      id: 'regb',
      name: 'Nürnberg Regensburger Straße',
      url: 'https://www.werkswelt.de/index.php?id=regb',
    },
    {
      id: 'spau',
      name: 'Nürnberg St. Paul',
      url: 'https://www.werkswelt.de/index.php?id=spau',
    },
    {
      id: 'mohm',
      name: 'Nürnberg Mensateria Ohm',
      url: 'https://www.werkswelt.de/index.php?id=mohm',
    },
    {
      id: 'cafeteria-veilstr',
      name: 'Nürnberg Veilhofstraße',
      url: 'https://www.werkswelt.de/index.php?id=cafeteria-veilstr',
    },
    {
      id: 'hohf',
      name: 'Nürnberg Hohfederstraße',
      url: 'https://www.werkswelt.de/index.php?id=hohf',
    },
    {
      id: 'cafeteria-langegasse',
      name: 'Nürnberg Lange Gasse',
      url: 'https://www.werkswelt.de/index.php?id=cafeteria-langegasse',
    },
    {
      id: 'baer',
      name: 'Nürnberg Bärenschanzstraße',
      url: 'https://www.werkswelt.de/index.php?id=baer',
    },
    {
      id: 'bingstrasse',
      name: 'Nürnberg Bingstraße',
      url: 'https://www.werkswelt.de/index.php?id=bingstrasse',
    },
    {
      id: 'eich',
      name: 'Eichstätt',
      url: 'https://www.werkswelt.de/index.php?id=eich',
    },
    {
      id: 'ingo',
      name: 'Ingolstadt',
      url: 'https://www.werkswelt.de/index.php?id=ingo',
    },
    {
      id: 'ansb',
      name: 'Ansbach',
      url: 'https://www.werkswelt.de/index.php?id=ansb',
    },
    {
      id: 'trie',
      name: 'Triesdorf',
      url: 'https://www.werkswelt.de/index.php?id=trie',
    },
  ]);
}
