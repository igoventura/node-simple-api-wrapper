import { appEntrypoint } from './attributes';
import { HelloWorldController, SumController } from './controllers';
import { BaseApplication } from './extensions';
import { MathService } from './services/math.service';

@appEntrypoint([
    HelloWorldController,
    SumController
], [
    MathService
])
export default class App extends BaseApplication {
    constructor() {
        super(App);
    }
}