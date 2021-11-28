import { gql } from "@apollo/client";

export const CREATE_RESERVATION = gql`
  mutation createReservation($roomId: ID, $start: Int, $end: Int) {
    createReservation(roomId: $roomId, start: $start, end: $end) {
      hours
    }
  }
`;
