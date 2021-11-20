import { Document, model, Schema as _Schema } from "mongoose";

const Schema = new _Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, index: { unique: true } },
    password: { type: String },
    organization: { type: String },
  },
  {
    timestamps: true,
  }
);

const User = model<Document & any>("User", Schema);
export default User;
