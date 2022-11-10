import * as mongoose from "mongoose";

const CapitalSchema = new mongoose.Schema({
  deposits: JSON,
  depositDescription: JSON,
  createdAt: Date,
  updatedAt: Date
});

export const CapitalModel = mongoose.model("Capital", CapitalSchema);