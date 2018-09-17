import{ injectable } from 'inversify';
import { IUser } from '../models/user.model';

export interface IUserService {
    getUsers(): Promise<IUser[]>;
}

@injectable()
export class UserService implements IUserService {
    
    constructor() {
    }

    public getUsers(): Promise<IUser[]> {
        // pretend that we get the first paginated list of users from POS API
        return new Promise((resolve, reject) => {
            resolve([
                {
                    id: '2',
                    name: 'Cuong Nguyen',
                    gender: 'male',
                    phone: '01656113565'
                } as IUser,
                {
                    id: '1',
                    name: 'Thanh Le',
                    gender: 'male',
                    phone: '0912345678'
                } as IUser
            ]);
        });
    }

}
