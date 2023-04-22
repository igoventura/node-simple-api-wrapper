import 'reflect-metadata';
import { Request, Response, Application } from 'express';

import { container } from '../dependency-injection/base';
import Symbols from '../dependency-injection/base/symbols';
import { Constructor } from '../types';
import { Server } from 'http';

export class BaseApplication {
    constructor(private extendedClass: Constructor) { }

    public init(port: number): Server {
        const controllers: Constructor[] = Reflect.getMetadata('APP_ENTRYPOINT_CONTROLLERS', this.extendedClass);
        const services: Constructor[] = Reflect.getMetadata('APP_ENTRYPOINT_SERVICES', this.extendedClass);
        const app = container.get<Application>(Symbols.AppConfig);

        controllers.forEach(controller => {
            const objController: Constructor = container.get(controller);
            const functions = Object.entries(objController);
            functions
                .filter(fn => {
                    const functionName = fn[0];
                    return Reflect.hasMetadata('HTTP_METHOD', objController, functionName) && Reflect.hasMetadata('HTTP_ROUTE', objController, functionName)
                })
                .forEach(fn => {
                    const functionName = fn[0];
                    const path = Reflect.getOwnMetadata('HTTP_PATH', controller);
                    const method = Reflect.getMetadata('HTTP_METHOD', objController, functionName)
                    const route = Reflect.getMetadata('HTTP_ROUTE', objController, functionName)

                    app.all(`${path}${route}`, (req: Request, res: Response) => {
                        if (req.method !== method) {
                            res.status(405).send('Method not allowed')
                        }

                        return fn[1].call(objController, req, res);
                    })
                })
        })

        services.forEach(service => {
            container.bind(service).toSelf();
        })

        container.rebind(Symbols.AppConfig).toConstantValue(app);
        return app.listen(port, () => { console.log(`api started -> http://localhost:${port}`) })
    }
}