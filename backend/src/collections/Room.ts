import { Document, model, Schema as _Schema } from "mongoose";

const Schema = new _Schema(
  {
    number: String,
  },
  {
    timestamps: true,
  }
);

const Room = model<Document & any>("Room", Schema);
export default Room;
