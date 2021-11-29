import { UserInputError } from "apollo-server-express";
import { Document } from "mongoose";
import mongoose from "mongoose";
import Reservation from "../collections/Reservation";

const maxReservation = 4;
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
    if (start === end + 1) {
      throw new UserInputError("Start and end hour cannot be equal");
    }
    let resPeriod: number[];
    if (end - start === 0) {
      resPeriod = Array(1).fill(0);
    } else {
      resPeriod = Array(end - start + 1).fill(0);
    }
    const hours = resPeriod.map((value, index) => {
      return start + index;
    });
    if (await this.checkHorizontal(roomId, hours)) {
      throw new UserInputError("Duplicate hours in room");
    } else if (await this.checkVertical(orgId, hours)) {
      throw new UserInputError("Maximum rooms per hour");
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
    const flatHours = currentHours[0]?.hours?.flat() ?? [];
    return await flatHours.some((hour: number) => hours.includes(hour));
  }

  /**
   * Checks vertical unique, by org
   * @param orgId
   * @param hours
   */
  static async checkVertical(orgId: string, hours: number[]): Promise<Boolean> {
    const currentHours = await Reservation.aggregate([
      {
        $match: { orgId: mongoose.Types.ObjectId(orgId) },
      },
      {
        $group: {
          _id: "$orgId",
          hours: { $push: "$hours" },
        },
      },
    ]);

    const flatHours = currentHours[0].hours.flat();

    const filteredFlatHours = flatHours.filter((hour: number) => {
      return hours.indexOf(hour) !== -1;
    });

    const counts = {};

    for (const num of filteredFlatHours) {
      counts[num] = counts[num] ? counts[num] + 1 : 1;
      if (counts[num] > maxReservation) return true;
    }
    return false;
  }
}
