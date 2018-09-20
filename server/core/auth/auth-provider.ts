import { interfaces } from 'inversify-express-utils';
import { injectable } from 'inversify';
import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import * as config from 'config';
import { IUser } from '../../models/user.model';

export class Principal implements interfaces.Principal {
    public details: IUser;

    public constructor(details: any) {
        this.details = details;
    }

    public isAuthenticated(): Promise<boolean> {
        return Promise.resolve(true);
    }

    public isResourceOwner(resourceId: any): Promise<boolean> {
        return Promise.resolve(resourceId === 1111);
    }

    public isInRole(role: string): Promise<boolean> {
        return Promise.resolve(role === "admin");
    }
}

@injectable()
export class AuthProvider implements interfaces.AuthProvider {

    public async getUser(req: express.Request,
                         res: express.Response,
                         next: express.NextFunction): Promise<interfaces.Principal> {
        if(!req.headers['authorization'] || !config.get('jwtSecret')) {
            return null;
        }

        const user = jwt.verify(req.headers['authorization'], config.get('jwtSecret'));
        const principal = new Principal(user);
        return principal;
    }

}