import{ injectable } from 'inversify';
import {IUser, default as User} from '../models/user.model';

export interface IUserService {
    getUsers(): Promise<IUser[]>;
    findById(id: string): Promise<IUser>;
    createUser(user: IUser): Promise<any>;
}

@injectable()
export class UserService implements IUserService {
    
    constructor() {
    }

    public async findById(id: string) {
        return await User.findOne({_id: id});
    }

    public getUsers(): Promise<IUser[]> {
        // pretend that we get the first paginated list of users from POS API
        return new Promise((resolve, reject) => {
            resolve([
                {
                    _id: '2',
                    name: 'Cuong Nguyen',
                    gender: 'male',
                    phone: '01656113565'
                } as IUser,
                {
                    _id: '1',
                    name: 'Thanh Le',
                    gender: 'male',
                    phone: '0912345678'
                } as IUser
            ]);
        });
    }

    public createUser(user: IUser): Promise<any> {
        // pretend that we get the first paginated list of users from POS API
        return new Promise((resolve, reject) => {
            User.create(user, (err, records) => {
                resolve(records);
            });
        });
    }

}
