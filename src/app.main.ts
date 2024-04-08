///<reference path="app-routes.ts"/>
import express, {Application} from 'express';
import http from 'http';
import bunyan from 'bunyan';
import {AppContext} from '~/app-context.types';
import {requireEnv} from '~/utils/parseEnv';
import {setupAppRoutes} from '~/app-routes';

export async function main() {
  const app = new App({
    port: +requireEnv('PORT'),
  });
  await app.start();
  app.appContext.logger.info({}, 'Application started');
}

export class App {
  private readonly app: Application = express();
  private readonly server = http.createServer(this.app);
  public readonly appContext: AppContext;

  constructor(
    private readonly config: {port: number},
  ) {
    const logger = bunyan.createLogger({name: 'pdf-create-app'});
    this.appContext = {app: this.app, logger};
  }

  public async start() {
    const {appContext, config, server} = this;

    setupAppRoutes(appContext);

    this.setupShutdownHandlers();

    server.keepAliveTimeout = 60000;
    server.listen(config.port);
  }

  public setupShutdownHandlers(): void {
    const {logger} = this.appContext;

    process.once('uncaughtException', (error: Error) => {
      logger.fatal({error}, 'uncaught exception');
      this.onShutdown(1);
    });

    process.once('SIGINT', () => {
      logger.fatal({}, 'SIGINT, shutting down process');
      this.onShutdown(0);
    });

    // SIGBREAK - Ctrl+Break на Windows
    process.once('SIGBREAK', () => {
      logger.fatal({}, 'SIGBREAK, shutting down process');
      this.onShutdown(0);
    });

    process.once('unhandledRejection', (error) => {
      logger.fatal({error}, 'unhandledRejection, shutting down process');
      this.onShutdown(1);
    });
  }

  private onShutdown(exitCode: number) {
    this.appContext.logger.info({exitCode}, 'onShutdown');

    // close port, deinit datasources, etc..
    if (this.server && this.server.listening) {
      this.server.close();
    }

    process.exit(exitCode);
  }
}
