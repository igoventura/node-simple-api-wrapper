import 'reflect-metadata';
import { Constructor } from '../types';
import { container } from '../dependency-injection';

export const appEntrypoint = (controllers: Constructor[] = [], services: Constructor[] = []) => {
    return (constructor: Constructor) => {
        Reflect.defineMetadata('APP_ENTRYPOINT', true, constructor);
        Reflect.defineMetadata('APP_ENTRYPOINT_CONTROLLERS', controllers, constructor)
        Reflect.defineMetadata('APP_ENTRYPOINT_SERVICES', services, constructor)

        controllers.forEach(controller => {
            container.bind(controller).toSelf();
        })

        services.forEach(service => {
            container.bind(service).toSelf();
        })
    }
}