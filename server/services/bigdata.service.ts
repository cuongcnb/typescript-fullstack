import{ injectable } from 'inversify';
import {IBigData, default as BigData} from '../models/bigdata.model';

export interface IBigDataService {
    findById(id: string): Promise<IBigData>;
}

@injectable()
export class BigDataService implements IBigDataService {
    
    constructor() {
    }

    public async findById(id: string) {
        return await BigData.findOne({_id: id});
    }
}
