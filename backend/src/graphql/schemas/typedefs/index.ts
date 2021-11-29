import { gql } from "apollo-server-express";

export const typeDefs = gql`
  scalar JSON
  scalar JSONObject

  type Organization {
    _id: ID
    name: String
  }

  type Room {
    _id: ID
    number: Int
  }

  type RoomTime {
    number: String
    resId: ID
    reservationStart: String
    reservationEnd: String
  }

  type RoomHours {
    number: String
    reservations: [String]
  }

  type Reservation {
    _id: ID
    roomId: ID
    hours: [Int]
    startHour: String
    endHour: String
    orgId: ID
  }

  type User {
    _id: ID
    email: String
    firstName: String
    lastName: String
    orgId: ID
  }
`;
