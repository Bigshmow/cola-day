import { Document } from "mongoose";
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
    const roomsHours = Promise.all(
      rooms.map(async ({ _id: roomId, number }) => {
        // get hours from each res, flatten and push {roomNumber:number, hours:number[]}
        const reservationDocs = await Reservation.find({ roomId });
        const reservations = reservationDocs.map((resDoc) => {
          return {
            hours: resDoc.get("hours"),
            orgId: resDoc.get("orgId"),
          };
        });
        return {
          number,
          reservations,
        };
      })
    );
    return roomsHours;
  }

  /**
   * Returns the entire User doc for this UserObject from MongoDB
   * @param roomId
   */
  getRoomStoredInfo(roomId): Promise<Document> {
    return Room.findById(roomId) as any;
  }
}
