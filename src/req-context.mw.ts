import type {Request, Response, NextFunction} from 'express';
import type {ReqContext} from './req-context.types';
import {RequestHandler} from 'express-serve-static-core';
import {AppContext} from '~/app-context.types';

export const reqContextMw = (appContext: AppContext): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    const logger = appContext.logger.child({
      url: req.url,
    });

    const reqContext: ReqContext = {
      logger,
    };

    res.locals = reqContext;

    next();
  };
};
