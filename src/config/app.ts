import { resolve } from 'path';

const rootPath = resolve(__dirname, '..', '..');

export default {
  key: process.env.APP_KEY || '@infoa2/key',
  apiKey: process.env.API_KEY || '@infoa2/apikey',

  path: {
    root: rootPath,
    tmp: resolve(rootPath, 'tmp'),
    public: resolve(rootPath, 'public'),
    uploads: resolve(rootPath, 'tmp', 'uploads'),
  },

  jwtExpiresIn: '7d',

  errorReturnType: 'json', // json | html
};
