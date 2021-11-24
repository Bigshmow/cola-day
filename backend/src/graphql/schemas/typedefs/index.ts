import { gql } from "apollo-server-express";

export const typeDefs = gql`
  scalar JSON
  scalar JSONObject

  type Room {
    _id: ID
    number: Int
    reservations: [Reservation]
  }

  type Reservation {
    _id: ID
  }

  type User {
    _id: ID
    email: String
    firstName: String
    lastName: String
    organization: String
  }
`;
