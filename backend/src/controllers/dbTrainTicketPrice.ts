import {NextFunction, Request, Response} from 'express';
import * as ejs from 'ejs';
import {readFileSync} from 'fs';

import {getDirPathOfDashBoardTemplate} from '../views/dashboard/render';
import {DBTicketPriceRepository} from '../repositories';
import KnexService from '../database/KnexService';
import {getDateOfNext30DaysWithTime} from '../utils/helpers';

async function dbTrainTicketPrice(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const dbTicketPriceRepo = new DBTicketPriceRepository(
      KnexService.getInstance()
    );

    const next30days = getDateOfNext30DaysWithTime(6, 30);

    // name of train station should be moved to types or constant later
    const data = await Promise.all(
      next30days.map(date => {
        // date = new Date(date.toISOString());
        return dbTicketPriceRepo.getAllPrices(
          'Nürnberg Hbf',
          'München Hbf',
          date
        );
      })
    );

    // render html template with data
    const templatePath = getDirPathOfDashBoardTemplate();
    const templateFilePath = `${templatePath}/trainTicketPrice.ejs`;
    const templateContent = readFileSync(templateFilePath, 'utf-8');

    const renderedContent = ejs.render(
      templateContent,
      {data},
      {
        root: templateFilePath,
      }
    );

    res.send(renderedContent);
  } catch (error) {
    next(error);
  }
}

export {dbTrainTicketPrice};
