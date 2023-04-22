import { Request, Response } from 'express';
import { httpController, httpGet } from '../attributes';
import { inject, injectable } from 'inversify';
import { MathService } from '../services/math.service';

@injectable()
@httpController('/sum')
export class SumController {

  constructor(@inject(MathService) private mathService: MathService) { }

  @httpGet('')
  sum = (req: Request, res: Response) => {
    var a = parseInt(req.query.a as string);
    var b = parseInt(req.query.b as string);
    res.json({ amount: this.mathService.sum(a, b) });
  }
}
