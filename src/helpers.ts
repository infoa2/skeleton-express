import { View } from '@infoa2/nodesdk';

import configView from './config/view';

export function renderView(template: string, context: object): string {
  const nunjucks = View.nunjucks(configView.path, configView.nujunks);

  return nunjucks.render(`${template}.njk`, context || {});
}
