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

  type Reservation {
    _id: ID
    roomId: ID
    hours: [Int]
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
