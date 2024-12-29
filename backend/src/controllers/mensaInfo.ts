import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';
import { MensaInfoRepository } from '../repositories';
import KnexService from '../database/KnexService';

/**
 * Controller for getting mensa information.
 */
async function getMensaInfo(req: Request, res: Response, next: NextFunction) {
  try {
    const mensaInfoRepo = new MensaInfoRepository(KnexService.getInstance());
    let mensaInfo;

    if (req.query.id) {
      // If query parameter id exists, give back information for single mensa.
      const queryMensaId = req.query.id as MensaID;
      mensaInfo = await mensaInfoRepo.getMensaInfoById(queryMensaId);
      if (!mensaInfo) {
        throw createHttpError.NotFound(`Mensa ID ${queryMensaId} not found`);
      }
    } else {
      // Otherwise give back all mensa information.
      mensaInfo = await mensaInfoRepo.getAllMensaInfo();
    }

    res.status(200).json(mensaInfo);
  } catch (error) {
    next(error);
  }
}

export { getMensaInfo };
