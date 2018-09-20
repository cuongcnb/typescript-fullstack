import { controller, httpGet, httpPost } from 'inversify-express-utils';
import { injectable, inject } from 'inversify';
import TYPES from '../constants/types';
import * as express from 'express';
import { LoggerInstance } from 'winston';
import { IUserService } from '../services/user.service';
import { IUser, default as User } from '../models/user.model';

@controller('/api/customers')
export class CustomerController {

    constructor(@inject(TYPES.LoggerInstance) private log: LoggerInstance,
                @inject(TYPES.IUserService) private userService: IUserService) {
    }

    @httpGet('/')
    public async getCustomers(req: express.Request, res: express.Response): Promise<IUser[]> {
        return await this.userService.getUsers();
    }

    @httpGet('/find')
    public async findCustomer(req: express.Request, res: express.Response): Promise<any[]> {
        return await User.find({}).exec();
    }

    @httpPost('/create')
    public async createCustomer(req: express.Request, res: express.Response): Promise<any[]> {

        let user = {
            _id: '2',
            name: 'Cuong Nguyen',
            gender: 'male',
            phone: '01656113565'
        } as IUser;

        return await this.userService.createUser(user);
    }
}
