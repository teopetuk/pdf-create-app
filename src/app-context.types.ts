import type {Application} from 'express';
import type * as Logger from 'bunyan';

export type AppContext = Readonly<{
  app: Application;
  readonly logger: Logger,
}>;
