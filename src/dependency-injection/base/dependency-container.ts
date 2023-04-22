import { Container } from "inversify";
import { AppConfig } from '../app';

const container = new Container();

new AppConfig().init(container);

export { container };
