import { UserInputError } from "apollo-server-express";
import { Document } from "mongoose";
import mongoose from "mongoose";
import Reservation from "../collections/Reservation";

/*
 * @class
 * */
export class ReservationObject {
  reservationId: string;
  reservation: Document;

  constructor(reservationId: string) {
    this.reservationId = reservationId;
  }

  /**
   * Creates a new Reservation for a given room and orgId
   * @param room
   * @param start
   * @param end
   * @param orgId
   */
  static async createReservation(
    roomId: string,
    start: number,
    end: number,
    orgId: string
  ): Promise<Document> {
    const hours: number[] = Array(end - start + 1)
      .fill(0)
      .map((value, index) => {
        return start + index;
      });
    if (this.checkHorizontal(roomId, hours)) {
      throw new UserInputError("Duplicate hours reservations");
      //   TODO: ifelse to check vertical
    } else {
      return await Reservation.create({
        roomId,
        hours,
        orgId,
      });
    }
  }

  /**
   * Checks horizontal unique, by room
   * @param roomId
   * @param hours
   */
  static async checkHorizontal(
    roomId: string,
    hours: number[]
  ): Promise<Boolean> {
    const currentHours = await Reservation.aggregate([
      {
        $match: { roomId: mongoose.Types.ObjectId(roomId) },
      },
      {
        $group: {
          _id: "$roomId",
          hours: { $push: "$hours" },
        },
      },
    ]);
    const flatHours = currentHours[0].hours.flat();
    return await flatHours.some((hour: number) => hours.includes(hour));
  }
}
