import { CourseModel } from "../models/Course";
import { STATUS } from "../config/status";
import { MESSAGES } from "../config/messages";

export class CourseController {
    public getCourses() {
        return new Promise(async (resolve, reject) => {
            try {
                const courses = await CourseModel.find();
                if (courses) {
                    resolve({
                        status: STATUS.SUCCESS,
                        courses
                    });
                }
            }
            catch(error) {
                reject({
                    status: STATUS.INTERNAL_SERVER_ERROR,
                    message: MESSAGES.ERROR_GET_COURSES,
                    error
                });
            }
        });
    }

    public saveCourse(course) {
        return new Promise(async (resolve, reject) => {
            try {
                const newCourse = new CourseModel({
                    title: course.title,
                    provider: course.provider,
                    category: course.category,
                    description: course.description,
                    startDate: course.startDate,
                    completeDate: course.completeDate,
                    link: course.link,
                    status: course.status,
                    print: course.print
                });
                const savedCourse = await newCourse.save();
                resolve({
                    status: STATUS.SUCCESS,
                    message: MESSAGES.SUCCESS_ADD_COURSE,
                });
            }
            catch(error) {
                reject({
                    status: STATUS.INTERNAL_SERVER_ERROR,
                    message: MESSAGES.ERROR_CREATE_COURSE
                })
            }
        });
    }
}