import { Controller, Get, Post, RequestBody, Response, Next, RequestParam } from 'inversify-express-utils';
import { injectable, inject } from 'inversify';
import TYPES from '../constants/types';
import * as express from 'express';
import { LoggerInstance } from 'winston';
import { IUserService } from '../services/user.service';
import { IUser, default as User } from '../models/user.model';

@injectable()
@Controller('/customers')
export class CustomerController {

    constructor(
        @inject(TYPES.LoggerInstance) private log: LoggerInstance,
        @inject(TYPES.IUserService) private userService: IUserService) {
    }

    @Get('/')
    public async getCustomers(req: express.Request, res: express.Response): Promise<IUser[]> {
        return await this.userService.getUsers();
    }

    @Get('/find')
    public async findCustomer(req: express.Request, res: express.Response): Promise<any[]> {
        return await User.find({}).exec();
    }
}
