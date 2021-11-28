import { Document } from "mongoose";
import Organization from "../collections/Organization";
import Reservation from "../collections/Reservation";
import Room from "../collections/Room";

/*
 * @class
 * */
export class RoomObject {
  roomId: string;
  room: Document;

  constructor(roomId: string) {
    this.roomId = roomId;
  }

  /**
   * Creates a new RoomObject from the ID of a previously stored user in MongoDB
   * @param roomId
   */
  static async createRoomObject(roomId: string): Promise<RoomObject> {
    const roomObject = new RoomObject(roomId);
    roomObject.room = await roomObject.getRoomStoredInfo(roomId);
    return roomObject;
  }

  /**
   * Create default rooms
   */
  static async createRooms(): Promise<Boolean> {
    for (let i = 0; i < 20; i++) {
      let roomNumber = 101 + i;
      await Room.create({
        number: roomNumber,
        reservations: [],
      });
    }
    return true;
  }

  /**
   * Returns the reservations for this room
   * @param roomId
   */
  static async getRoomReservations(roomId): Promise<[Document]> {
    return (await Reservation.find({ roomId })) as any;
  }

  /**
   * Returns the room number and associated reservation hours with org
   */
  static async getRoomHours(): Promise<any> {
    // get all rooms
    const rooms = await Room.find({});
    // get reservations by room id
    return await Promise.all(
      rooms.map(async ({ _id: roomId, number }) => {
        // get hours from each res, flatten and push {roomNumber:number, hours:number[]}
        const reservationDocs = await Reservation.find({ roomId });
        const blockArr: number[] = Array(9).fill(null);
        await Promise.all(
          reservationDocs.map(async (resDoc) => {
            const organization = await Organization.findById(
              resDoc.get("orgId")
            );
            resDoc.get("hours").forEach((hour) => {
              blockArr[hour] = organization.get("name");
            });
            return blockArr;
          })
        );
        return {
          number,
          reservations: blockArr,
        };
      })
    );
    // console.log(roomsHours);
    // return roomsHours;
  }

  /**
   * Returns the entire User doc for this UserObject from MongoDB
   * @param roomId
   */
  getRoomStoredInfo(roomId): Promise<Document> {
    return Room.findById(roomId) as any;
  }
}
