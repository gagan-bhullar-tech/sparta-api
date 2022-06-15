import * as mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
  title: String,
  provider: String,
  category: String,
  description: String,
  startDate: Date,
  completeDate: Date,
  link: String,
  status: String,
  print: Boolean,
});

export const CourseModel = mongoose.model("Course", CourseSchema);