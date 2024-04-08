import {Request, Response} from 'express';

export const createPdfRoute = (_unused: unknown) => {
  return async (_req: Request, res: Response) => {
    const {logger} = res.locals;
    logger.info({}, 'createPdfRoute');
    res.end('ok');
  };
};
