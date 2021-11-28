import { gql } from "@apollo/client";

export const GET_ALL_ROOMS = gql`
  query getAllRooms {
    getAllRooms {
      _id
      number
    }
  }
`;

export const GET_ALL_ROOMS_RESERVATION_HOURS = gql`
  query getAllRoomsReservationHours {
    getAllRoomsReservationHours {
      number
      reservations {
        hours
        orgId
      }
    }
  }
`;
