import { resolve } from 'path';
import { Mailer } from '@infoa2/nodesdk';

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
      name: process.env.MAIL_FROM_NAME || 'Infoa 2',
      address: process.env.MAIL_FROM_MAIL || 'noreply@infoa2.com.br',
    },
  },
  nunjucks: {
    path: resolve(configView.path, 'emails'),
    options: configView.nujunks,
  },
});
