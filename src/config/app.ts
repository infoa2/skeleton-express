import { resolve } from 'path';

const rootPath = resolve(__dirname, '..', '..');

export default {
  key: process.env.APP_KEY || 'app:secret',
  apiKey: process.env.API_KEY || 'api:secret',

  onlyApi: true,

  path: {
    root: rootPath,
    tmp: resolve(rootPath, 'tmp'),
    public: resolve(rootPath, 'public'),
    uploads: resolve(rootPath, 'tmp', 'uploads'),
  },
};
