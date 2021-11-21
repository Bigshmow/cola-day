import { Document, model, Schema as _Schema } from "mongoose";

const Schema = new _Schema(
  {
    name: String,
  },
  {
    timestamps: true,
  }
);

const Organization = model<Document & any>("Organization", Schema);
export default Organization;
