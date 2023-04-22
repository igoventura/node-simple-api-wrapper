import { HttpMethod } from '../types';

const httpMethod = (route: string, method: HttpMethod): PropertyDecorator => {
    return (target, property) => {
        Reflect.defineMetadata('HTTP_METHOD', method, target, property);
        Reflect.defineMetadata('HTTP_ROUTE', route, target, property);
    }
}

export const httpGet = (route: string): PropertyDecorator => httpMethod(route, HttpMethod.GET);
export const httpPost = (route: string): PropertyDecorator => httpMethod(route, HttpMethod.POST);
export const httpPut = (route: string): PropertyDecorator => httpMethod(route, HttpMethod.PUT);
export const httpDelete = (route: string): PropertyDecorator => httpMethod(route, HttpMethod.DELETE);
export const httpPatch = (route: string): PropertyDecorator => httpMethod(route, HttpMethod.PATCH);
export const httpOptions = (route: string): PropertyDecorator => httpMethod(route, HttpMethod.OPTIONS);
export const httpHead = (route: string): PropertyDecorator => httpMethod(route, HttpMethod.HEAD);