import 'reflect-metadata';
import { interfaces, Controller, InversifyExpressServer, TYPE } from 'inversify-express-utils';
import { Container } from 'inversify';
import { Logger, LoggerInstance, LoggerOptions, transports } from 'winston';
import TAGS from './constants/tags';
import TYPES from './constants/types';
import { HomeController } from './controllers/home.controller';
import { CustomerController } from './controllers/customer.controller';
import { IUserService, UserService } from './services/user.service';

let container = new Container();

// log binding
const logger: LoggerInstance = new Logger(<LoggerOptions> {
    exitOnError: false,
    transports: [
        new transports.Console()
    ]
});
container.bind<LoggerInstance>(TYPES.LoggerInstance).toConstantValue(logger);

// services binding

container.bind<IUserService>(TYPES.IUserService).to(UserService).inSingletonScope();


// controllers binding
container.bind<interfaces.Controller>(TYPE.Controller).to(HomeController).whenTargetNamed(TAGS.HomeController);
container.bind<interfaces.Controller>(TYPE.Controller).to(CustomerController).whenTargetNamed(TAGS.CustomerController);

export default container;
