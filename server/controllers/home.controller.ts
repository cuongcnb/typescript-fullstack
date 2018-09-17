import { Controller, Get } from 'inversify-express-utils';
import { injectable } from 'inversify';
import * as express from 'express';
import * as path from 'path';

@injectable()
@Controller('/')
export class HomeController {
    @Get('/')
    public get(req: express.Request, res: express.Response): void {
        res.sendFile(path.join(__dirname, '../../client', 'index.html'));
    }
}