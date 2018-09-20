import { controller, httpGet, httpPost } from 'inversify-express-utils';
import { injectable, inject } from 'inversify';
import TYPES from '../constants/types';
import * as express from 'express';
import { LoggerInstance } from 'winston';
import { IBigDataService } from '../services/bigdata.service';
import { IBigData, default as BigData } from '../models/bigdata.model';
import { BaseController } from './base.controller';

@controller('/api/bigdatas')
export class BigDataController extends BaseController{
    @inject(TYPES.LoggerInstance) private log: LoggerInstance;
    @inject(TYPES.IBigDataService) private bigDataService: IBigDataService;

    @httpGet('/find')
    public async find(req: express.Request, res: express.Response): Promise<IBigData> {
        let _id = req.param('_id');
        return await this.bigDataService.findById(_id);
    }

    @httpPost('/find-by-uid')
    public async findById(req: express.Request, res: express.Response): Promise<any> {
        const data = req.body;
        this.log.info('find by uid');
    }
}
