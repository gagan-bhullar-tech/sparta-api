import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as express from 'express';
import { Request, Response } from 'express';
import * as expressvalidator from 'express-validator';
import * as morgan from 'morgan';
import * as passport from 'passport';
import * as path from 'path';
import { Config } from './config/config';
import { BookController } from './controllers/BookController';
import { CourseController } from './controllers/CourseController';
import { BookRouter } from './routes/BookRouter';
import { CourseRouter } from './routes/CourseRouter';

class App {
  public app: express.Application;
  public router: express.Router;
  private courseController: CourseController;
  private bookController: BookController;
  private courseRouter: CourseRouter;
  private bookRouter: BookRouter;

  constructor() {
    this.app = express();
    this.router = express.Router();
    this.config();
    this.courseRouter.routes(this.router);
    this.bookRouter.routes(this.router);
    this.app.use("/v1", this.router);
  }

  private config(): void {
    Config.configureDb();
    this.configControllers();
    this.configRouters();
    this.app.use(cors());
    this.app.use(express.static(path.join(__dirname + "/../node_modules")));
    this.app.set("view engine", "ejs");
    this.app.set("views", path.join(__dirname, "views"));
    this.app.use(bodyParser.json());
    this.app.use(
      bodyParser.urlencoded({
        extended: false,
      })
    );
    this.app.use(morgan("combined"));
    this.app.use(cookieParser());
    this.app.use(expressvalidator());
    this.app.use(passport.initialize());
    this.app.use(passport.session());
    this.app.route("/").get((req: Request, res: Response) => {
      res
        .status(200)
        .send(JSON.stringify({ message: "Welcome To Sparta API" }));
    });
  }

  private configControllers() {
    this.courseController = new CourseController();
    this.bookController = new BookController();
  }

  private configRouters() {
    this.courseRouter = new CourseRouter(this.courseController);
    this.bookRouter = new BookRouter(this.bookController);
  }
}

export default new App().app;
