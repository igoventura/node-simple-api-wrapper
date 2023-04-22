import { Request, Response } from 'express';
import { httpController, httpGet } from '../attributes';
import { injectable } from 'inversify';

@injectable()
@httpController('/hello-world')
export class HelloWorldController {
  @httpGet('')
  helloWorld = (req: Request, res: Response) => {
    res.json({ hello: 'world' });
  }

  @httpGet('/test')
  helloWorldTest = (req: Request, res: Response) => {
    res.json({ hello: 'world test' });
  }
}
