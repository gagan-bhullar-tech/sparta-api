import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as express from 'express';
import { Request, Response } from 'express';
import * as session from 'express-session';
import * as expressvalidator from 'express-validator';
import * as morgan from 'morgan';
import * as passport from 'passport';
import * as path from 'path';
//import * as config from './config/config';
//import * as passportConfig from './config/passport';
//import * as Middleware from './middleware/middleware';

class App {
  public app: express.Application;
  public router: express.Router;

  constructor() {
    this.app = express();
    this.router = express.Router();
    this.config();
    this.app.use('/v1', this.router);
  }

  private config(): void {
    this.app.use(cors());
    this.app.use(express.static(path.join(__dirname + '/../node_modules')));
    this.app.set('view engine', 'ejs');
    this.app.set('views', path.join(__dirname, 'views'));
    this.app.use(bodyParser.json());
    this.app.use(
      bodyParser.urlencoded({
        extended: false,
      })
    );
//    passportConfig.passport(passport, db);
    this.app.use(morgan('combined'));
    this.app.use(cookieParser());
    //this.app.use(session({ secret: config.sessionSecret, saveUninitialized: true, resave: true }));
    this.app.use(expressvalidator());
    this.app.use(passport.initialize());
    this.app.use(passport.session());
    this.app.route('/').get((req: Request, res: Response) => {
      res.status(200).send(JSON.stringify({ message: 'Welcome To Sparta API' }));
    });
  }
}

export default new App().app;