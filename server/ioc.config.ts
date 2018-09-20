import 'reflect-metadata';
import { Container } from 'inversify';
import { Logger, LoggerInstance, LoggerOptions, transports } from 'winston';
import TAGS from './constants/tags';
import TYPES from './constants/types';
import { IUserService, UserService } from './services/user.service';
import { HistoryService, IHistoryService } from './services/history.service';
import { BigDataService, IBigDataService } from './services/bigdata.service';

// declare metadata by @controller annotation
import './controllers/auth.controller';
import './controllers/bigdata.controller';
import './controllers/customer.controller';
import './controllers/history.controller';
import './controllers/home.controller';
import './controllers/user.controller';

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
container.bind<IHistoryService>(TYPES.IHistoryService).to(HistoryService).inSingletonScope();
container.bind<IBigDataService>(TYPES.IBigDataService).to(BigDataService).inSingletonScope();

export default container;
