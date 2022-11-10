import { CapitalController } from "../controllers/CapitalController";
import * as csurf from "csurf";
import { STATUS } from "../config/status";

export class CapitalRouter {
  constructor(private capitalController: CapitalController) {}

  public routes(app): void {
    const csrfProtection = csurf({ cookie: true });

    app.get("/recent/capital", csrfProtection, (req, res) => {
      this.capitalController
        .getRecentCapital()
        .then((data: any) => {
          res.status(data.status).json(data);
        })
        .catch((error) => {
          res.status(STATUS.INTERNAL_SERVER_ERROR).json(error);
        });
    });

    app.post("/capital", (req, res) => {
      this.capitalController
        .saveCapital(req.body)
        .then((data: any) => {
          res.status(data.status).json(data);
        })
        .catch((error) => {
          res.status(STATUS.INTERNAL_SERVER_ERROR).json(error);
        });
    });
  }
}
