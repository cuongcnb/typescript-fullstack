import {BaseHttpController} from "inversify-express-utils";
import { IUser } from '../models/user.model';

export class BaseController extends BaseHttpController {
    protected getUser(): IUser {
        return this.httpContext.user && this.httpContext.user.details;
    }
}