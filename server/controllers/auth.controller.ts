import { controller, httpPost } from 'inversify-express-utils';
import { injectable, inject } from 'inversify';
import TYPES from '../constants/types';
import * as express from 'express';
import { LoggerInstance } from 'winston';
import { IUserService } from '../services/user.service';
import * as jwt from 'jsonwebtoken';
import * as config from 'config';
import { IUser } from '../models/user.model';
import * as rp from 'request-promise';
import { BaseController } from './base.controller';

@controller('/auth')
export class AuthController extends BaseController {

    @inject(TYPES.LoggerInstance) private log: LoggerInstance;
    @inject(TYPES.IUserService) private userService: IUserService;

    @httpPost('/login')
    public async login(req: express.Request, res: express.Response) {
        /*
         * Check if the access_token is correct
         */
        const access_token = req.body.access_token;
        const graphApi = `https://graph.facebook.com/me?fields=id,gender,name&access_token=${access_token}`;
        try {
            const fbUser = await rp({
                uri: graphApi,
                json: true // Automatically parses the JSON string in the response
            });

            // check exist in db
            let user = await this.userService.findById(fbUser.id);
            if (!user) {
                user = {
                    _id: fbUser.id,
                    name: fbUser.name
                } as IUser;

                await this.userService.createUser(user);
            }

            return await Promise.resolve({
                id: fbUser.id,
                name: fbUser.name,
                token: jwt.sign(fbUser, config.get('jwtSecret'), {expiresIn: 60 * 60})
            })
        } catch (e) {
            res.status(401).json({
                error: {
                    message: 'access_token invalid'
                }
            });
        }
    }
}
