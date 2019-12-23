/* eslint-disable no-unused-vars */
import './env';
import 'express-async-errors';
import http, { Server as HttpServer } from 'http';
import express, { Application } from 'express';
import helmet from 'helmet';
import * as Sentry from '@sentry/node';
import { Database, View } from '@vagnercardoso/nodesdk';
import { Environment } from 'nunjucks';
import { Sequelize } from 'sequelize';

import configView from './config/view';
import configSentry from './config/sentry';
// @ts-ignore
import configDatabase from './config/database';

import * as middlewares from './middlewares';
import * as models from './models';

export interface IApp {
  app: Application;
  server: HttpServer;
  nunjucks: Environment;
  sequelize: Sequelize;
}

class App implements IApp {
  public app: Application;
  public server: HttpServer;
  // @ts-ignore
  public nunjucks: Environment;
  // @ts-ignore
  public sequelize: Sequelize;

  public constructor() {
    this.app = express();
    this.server = http.createServer(this.app);

    this.sentry();
    this.view();
    this.database();
    this.middlewares();
  }

  private sentry(): void {
    if (process.env.NODE_ENV === 'production') {
      Sentry.init(configSentry);
    }
  }

  private view(): void {
    this.nunjucks = View.nunjucks(configView.path, {
      ...configView.nujunks,
      express: this.app,
    });
  }

  private database(): void {
    this.sequelize = Database.sequelize({
      ...configDatabase,
      models: Object.values(models),
    });
  }

  private middlewares(): void {
    const allMiddlewares = [
      helmet(),
      express.json(),
      express.urlencoded({ extended: true }),
      ...Object.values(middlewares),
    ];

    if (configSentry.dsn && process.env.NODE_ENV === 'production') {
      allMiddlewares.unshift(
        Sentry.Handlers.requestHandler({ serverName: true })
      );
    }

    allMiddlewares.forEach((middleware: any) => {
      if (typeof middleware !== 'function') {
        return;
      }

      try {
        this.app.use(middleware(this));
      } catch (e) {
        this.app.use(middleware);
      }
    });
  }
}

export default new App().server;
