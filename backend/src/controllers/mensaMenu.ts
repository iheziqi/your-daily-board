import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';
import {
  MensaMenuDishesRepository,
  MensaMenuRepository,
} from '../repositories';
import KnexService from '../database/KnexService';

/**
 * Controller for getting mensa menu.
 */
async function getMensaMenu(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.query.id || !req.query.date) {
      throw createHttpError.BadRequest('Query params id and date are needed');
    }

    const mensaMenuRepo = new MensaMenuRepository(KnexService.getInstance());

    // If query parameter id and date exists, give back mensa menu.
    const queryMensaId = req.query.id as MensaID;
    const queryDate = req.query.date as string;

    const mensaMenu = await mensaMenuRepo.getMenuByMensaIdAndDate(
      queryMensaId,
      queryDate
    );
    if (!mensaMenu) {
      throw createHttpError.NotFound(
        `Mensa ${queryMensaId} doesn't have menu on ${queryDate}`
      );
    }

    res.status(200).json(mensaMenu);
  } catch (error) {
    next(error);
  }
}

/**
 * Controller for getting mensa menu dishes.
 */
async function getMensaMenuDishes(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.query.id || !req.query.date) {
      throw createHttpError.BadRequest('Query params id and date are needed');
    }

    const mensaMenuDishesRepo = new MensaMenuDishesRepository(
      KnexService.getInstance()
    );

    // If query parameter id and date exists, give back mensa menu dishes.
    const queryMensaId = req.query.id as MensaID;
    const queryDate = req.query.date as string;

    const mensaMenuDishes = await mensaMenuDishesRepo.getMensaDishesOn(
      queryMensaId,
      queryDate
    );
    res.status(200).json(mensaMenuDishes);
  } catch (error) {
    next(error);
  }
}

export { getMensaMenu, getMensaMenuDishes };
