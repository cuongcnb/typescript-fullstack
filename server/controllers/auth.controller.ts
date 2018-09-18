import { Controller, Get, Post, RequestBody, Response, Next, RequestParam } from 'inversify-express-utils';
import { injectable, inject } from 'inversify';
import TYPES from '../constants/types';
import * as express from 'express';
import { LoggerInstance } from 'winston';
import { IUserService } from '../services/user.service';
import * as jwt from 'jsonwebtoken';
import * as config from 'config';

@injectable()
@Controller('/auth')
export class AuthController {

    constructor(
        @inject(TYPES.LoggerInstance) private log: LoggerInstance,
        @inject(TYPES.IUserService) private userService: IUserService) {
    }

    @Post('/login')
    public async login(req: express.Request, res: express.Response) {
        /*
         * Check if the username and password is correct
         */
        if( req.body.username === 'admin' && req.body.password === 'admin' ) {
            return await Promise.resolve({
                id: 1,
                username: 'admin',
                jwt: jwt.sign({
                    id: 1,
                }, config.get('jwtSecret'), { expiresIn: 60*60 })
            })
        } else {
            /*
             * If the username or password was wrong, return 401 ( Unauthorized )
             * status code and JSON error message
             */
            res.status(401).json({
                error: {
                    message: 'Wrong username or password!'
                }
            });
        }
    }
}
