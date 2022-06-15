import * as mongoose from 'mongoose';

const BookSchema = new mongoose.Schema({
    title: String,
    author: String,
    category: String,
    startDate: Date,
    completeDate: Date,
    status: String
});

export const BookModel = mongoose.model('Book', BookSchema);