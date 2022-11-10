import { CapitalModel } from "../models/Capital";
import { STATUS } from "../config/status";
import { MESSAGES } from "../config/messages";

export class CapitalController {
    public getRecentCapital() {
        return new Promise(async (resolve, reject) => {
            try {
                const capital = await CapitalModel.find().sort({ createdAt: -1 }).limit(1);
                if (capital) {
                    resolve({
                        status: STATUS.SUCCESS,
                        capital: capital ? capital[0]: ""
                    });
                }
            }
            catch(error) {
                reject({
                    status: STATUS.INTERNAL_SERVER_ERROR,
                    message: MESSAGES.ERROR_GET_CAPITAL,
                    error
                });
            }
        });
    }

    public saveCapital(capital) {
        return new Promise(async (resolve, reject) => {
            try {
                const newCapital = new CapitalModel({
                    deposits: capital.deposits,
                    depositDescription: capital.depositDescription,
                    createdAt: new Date(),
                    updatedAt: new Date()
                });
                await newCapital.save();
                resolve({
                    status: STATUS.SUCCESS,
                    message: MESSAGES.SUCCESS_ADD_CAPITAL,
                });
            }
            catch(error) {
                reject({
                    status: STATUS.INTERNAL_SERVER_ERROR,
                    message: MESSAGES.ERROR_CREATE_CAPITAL
                })
            }
        });
    }
}