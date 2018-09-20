import { controller, httpGet } from 'inversify-express-utils';
import { injectable, inject } from 'inversify';
import TYPES from '../constants/types';
import * as express from 'express';
import { LoggerInstance } from 'winston';
import { IHistoryService } from '../services/history.service';
import { IHistory, default as History } from '../models/history.model';

@controller('/api/histories')
export class HistoryController {

    constructor(
        @inject(TYPES.LoggerInstance) private log: LoggerInstance,
        @inject(TYPES.IHistoryService) private historyService: IHistoryService) {
    }

    @httpGet('/getByUserId')
    public async getByUserId(req: express.Request, res: express.Response): Promise<IHistory[]> {
        let user_id = req.param('user_id');
        return await this.historyService.getByUserId(user_id);
    }
}
