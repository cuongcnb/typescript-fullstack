import{ injectable } from 'inversify';
import {IHistory, default as History} from '../models/history.model';

export interface IHistoryService {
    getByUserId(user_id: string): Promise<IHistory[]>;
}

@injectable()
export class HistoryService implements IHistoryService {
    
    constructor() {
    }

    public async getByUserId(user_id: string) {
        return await History.where("user_id", user_id);
    }
}
