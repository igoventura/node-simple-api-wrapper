import express, { Express } from 'express';
import { interfaces } from 'inversify';
import Symbols from '../dependency-injection/base/symbols'

export class AppConfig {
    init(container: interfaces.Container) {
        container.bind(Symbols.AppConfig).toConstantValue(express());
    }
}
