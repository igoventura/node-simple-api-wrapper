import { injectable } from 'inversify';

@injectable()
export class MathService {
    public sum(a: number, b: number): number {
        return a + b;
    }
}