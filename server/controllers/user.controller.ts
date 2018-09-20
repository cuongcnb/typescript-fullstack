import { controller, httpGet } from 'inversify-express-utils';
import { injectable, inject } from 'inversify';
import TYPES from '../constants/types';
import * as express from 'express';
import { LoggerInstance } from 'winston';
import { IUserService } from '../services/user.service';
import { BaseController } from './base.controller';

@controller('/api/user')
export class UserController extends BaseController {
    @inject(TYPES.LoggerInstance) private log: LoggerInstance;
    @inject(TYPES.IUserService) private userService: IUserService;

    @httpGet('/my-info')
    public async getInfo() {
        return await Promise.resolve(this.getUser());
    }
}
