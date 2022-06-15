import { BookController } from "../controllers/BookController";
import * as csurf from "csurf";
import { STATUS } from "../config/status";

export class BookRouter {
  private bookController: BookController;

  constructor() {
    this.bookController = new BookController();
  }

  public routes(app): void {
    const csrfProtection = csurf({ cookie: true });
    app.get("/books", csrfProtection, (req, res) => {
      this.bookController
        .getBooks()
        .then((data: any) => {
          res.status(data.status).json(data);
        })
        .catch((error) => {
          res.status(STATUS.INTERNAL_SERVER_ERROR).json(error);
        });
    });

    app.post("/book", (req, res) => {
      this.bookController
        .saveBook(req.body)
        .then((data: any) => {
          res.status(data.status).json(data);
        })
        .catch((error) => {
          res.status(STATUS.INTERNAL_SERVER_ERROR).json(error);
        });
    });
  }
}
