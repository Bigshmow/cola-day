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
      reservations
    }
  }
`;

export const GET_RESERVATIONS_BY_ORG_ID = gql`
  query getReservationsByOrgId {
    getReservationsByOrgId {
      number
      reservationStart
      reservationEnd
      resId
    }
  }
`;
