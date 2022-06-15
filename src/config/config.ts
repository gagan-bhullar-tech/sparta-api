import * as mongoose from "mongoose";

export class Config {
  static async configureDb() {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
}
