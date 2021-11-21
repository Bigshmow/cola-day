import { Document, model, Schema as _Schema } from "mongoose";

const Schema = new _Schema(
  {
    hours: [Number],
    organization: { type: String },
  },
  {
    timestamps: true,
  }
);

const Reservation = model<Document & any>("Reservation", Schema);
export default Reservation;
