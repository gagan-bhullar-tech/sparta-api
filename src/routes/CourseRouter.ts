import { CourseController } from "../controllers/CourseController";
import * as csurf from 'csurf';
import { STATUS } from "../config/status";

export class CourseRouter {
    private courseController: CourseController;

    constructor() {
        this.courseController = new CourseController();
    }

    public routes(app) : void {
        const csrfProtection = csurf({ cookie: true });
        app.get('/courses', csrfProtection, (req, res) => {
            this.courseController.getCourses().then((data: any) => {
                res.status(data.status).json(data);
            })
            .catch(error => {
                res.status(STATUS.INTERNAL_SERVER_ERROR).json(error);
            })
        });

        app.post('/course', (req, res) => {
            this.courseController.saveCourse(req.body).then((data: any) => {
                res.status(data.status).json(data);
            })
            .catch(error => {
                res.status(STATUS.INTERNAL_SERVER_ERROR).json(error);
            })
        });
    }
}