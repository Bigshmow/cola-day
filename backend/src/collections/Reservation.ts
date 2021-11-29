import { Document, model, Schema as _Schema } from "mongoose";

const Schema = new _Schema(
  {
    roomId: { type: _Schema.Types.ObjectId, ref: "Room" },
    hours: [Number],
    startHour: String,
    endHour: String,
    orgId: { type: _Schema.Types.ObjectId, ref: "Organization" },
  },
  {
    timestamps: true,
  }
);

const Reservation = model<Document & any>("Reservation", Schema);
export default Reservation;
