import 'reflect-metadata';
import { Constructor } from '../types';

export const httpController = (path: string) => {
    return (constructor: Constructor) => {
        Reflect.defineMetadata('HTTP_PATH', path, constructor);
    }
}