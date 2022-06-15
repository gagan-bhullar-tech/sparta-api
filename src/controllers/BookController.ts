import { BookModel } from "../models/Book";
import { STATUS } from "../config/status";
import { MESSAGES } from "../config/messages";

export class BookController {
  public getBooks() {
    return new Promise(async (resolve, reject) => {
      try {
        const books = await BookModel.find();
        if (books) {
          resolve({
            status: STATUS.SUCCESS,
            books,
          });
        }
      } catch (error) {
        reject({
          status: STATUS.INTERNAL_SERVER_ERROR,
          message: MESSAGES.ERROR_GET_BOOKS,
          error,
        });
      }
    });
  }

  public saveBook(book) {
    return new Promise(async (resolve, reject) => {
      try {
        const newBook = new BookModel({
          title: book.title,
          author: book.author,
          category: book.category,
          startDate: book.startDate,
          completeDate: book.completeDate,
          status: book.status,
        });
        const savedBook = await newBook.save();
        resolve({
          status: STATUS.SUCCESS,
          message: MESSAGES.SUCCESS_ADD_BOOK,
        });
      } catch (error) {
        reject({
          status: STATUS.INTERNAL_SERVER_ERROR,
          message: MESSAGES.ERROR_CREATE_BOOK,
        });
      }
    });
  }
}
