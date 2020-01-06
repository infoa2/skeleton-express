// eslint-disable-next-line no-unused-vars
import { Response } from 'express';

class IndexController {
  async index(_: any, res: Response) {
    return res.success({
      date: new Date(),
      company: 'Infoa2',
      developer: [
        {
          name: 'Vagner dos Santos Cardoso',
          email: 'vagner.cardoso@infoa2.com.br',
        },
      ],
    });
  }
}

export default new IndexController();
