import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';
import * as path from 'path';
import * as config from 'config';
import * as jwt from 'express-jwt';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as http from 'http';
import * as mongoose from 'mongoose';
import container from './ioc.config';

mongoose.connect(config.get('database.url'), (err: any) => {
    if (err) {
        console.log(err.message);
    } else {
        console.log("Mongo Succesfully Connected!")
    }
});

let server = new InversifyExpressServer(container);
server.setConfig((app) => {

  app.use(cors());

  app.use(bodyParser.urlencoded({
    extended: true
  }));

  app.use(bodyParser.json());

  app.use('/node_modules', express.static(path.join(__dirname, '../node_modules')));

  app.use('/api', jwt(<jwt.Options> {
    secret: config.get('oauth.publicKey')})
  );
});

// some async init operations, such as making sure ES indices are created and starting task runners
// these init operations should finish before launching the app

let app = server.build();
let httpServer = http.createServer(app);
httpServer.listen(config.get('port'));
console.log('Started server in port ' + config.get('port'));

// it is bad to go back to the dark days of doing export and not using IoC. However, we can't be too idealistic here,
// as the typing definition of socket.io doesn't export Server type, so we can't bind io object to that type. Also,
// modifying IoC container once it is attached to the web server is considered bad
