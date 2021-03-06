import { Mailer } from '@infoa2/nodesdk';
import { resolve } from 'path';

import configView from './view';

export default new Mailer({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: false,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
  options: {
    from: {
      name: process.env.MAIL_FROM_NAME || 'From Name',
      address: process.env.MAIL_FROM_MAIL || 'noreply@localhost.local',
    },
  },
  nunjucks: {
    path: resolve(configView.path, 'emails'),
    options: configView.nujunks,
  },
});
