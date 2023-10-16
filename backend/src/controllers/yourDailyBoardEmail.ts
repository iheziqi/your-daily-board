import {Request, Response} from 'express';
import * as ejs from 'ejs';
import {readFileSync} from 'fs';

import KnexService from '../database/KnexService';
import {MensaInfoRepository, MensaMenuRepository} from '../repositories';
import {getDirPathOfEmailTemplate} from '../views/emails/v1/render';
import {classifyMensas, getCurrentDate} from '../utils/helpers';

export async function getDailyBoardEmailPreview(_req: Request, res: Response) {
  // Initialize repos.
  const knexInstance = KnexService.getInstance();
  const mensaInfoRepo = new MensaInfoRepository(knexInstance);
  const menuRepo = new MensaMenuRepository(knexInstance);

  // Gets and groups mensa info according to places.
  const mensaInfo = await mensaInfoRepo.getAllMensaInfo();
  const classifiedMensaInfo = classifyMensas(mensaInfo);

  const places = Object.keys(classifiedMensaInfo);
  const mensaMenus: VMensaMenu[] = [];

  let today: string;

  const now = new Date();
  const currentHour = now.getHours();

  if (currentHour >= 10) {
    // If it's 10 AM or later, use the current date
    today = getCurrentDate();
  } else {
    // If it's before 10 AM, use the previous date
    const previousDay = new Date(now);
    previousDay.setDate(now.getDate() - 1);
    const year = previousDay.getFullYear();
    const month = String(previousDay.getMonth() + 1).padStart(2, '0');
    const day = String(previousDay.getDate()).padStart(2, '0');
    today = `${year}-${month}-${day}`;
  }

  // For each place, get all mensa menu that will be passed to email template.
  for (const place of places) {
    const mensaIds = Object.keys(classifiedMensaInfo[place]) as MensaID[];
    for (const id of mensaIds) {
      const menu = await menuRepo.getMenuByMensaIdAndDate(id, today);

      if (menu) {
        mensaMenus.push({
          mensaName: mensaInfo[id].name,
          mensaMenu: menu,
          jumpLinkId: id,
        });
      } else {
        mensaMenus.push({
          mensaName: mensaInfo[id].name,
          mensaMenu:
            'No menu today or Mensa is closed. Please go to the website of StudierendenWerk for more information.',
          jumpLinkId: id,
        });
      }
    }
  }

  const templatePath = getDirPathOfEmailTemplate();
  const templateFilePath = `${templatePath}/boardSkeleton.ejs`;
  const templateContent = readFileSync(templateFilePath, 'utf-8');

  // Gets root url of backend for unsubscribe link.
  const rootUrl = process.env.ROOT_URL;
  // Gets frontend url for updating subscription and share link.
  const frontendUrl = process.env.FRONTEND_URL;

  // Using ejs to render email.
  const renderedContent = ejs.render(
    templateContent,
    {exchangeRates: [], mensaMenus, rootUrl, frontendUrl},
    {
      root: templatePath,
    }
  );

  res.send(renderedContent);
}
