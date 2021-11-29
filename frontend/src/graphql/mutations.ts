import { gql } from "@apollo/client";

export const CREATE_RESERVATION = gql`
  mutation createReservation(
    $roomId: ID
    $start: Int
    $end: Int
    $startHour: String
    $endHour: String
  ) {
    createReservation(
      roomId: $roomId
      start: $start
      end: $end
      startHour: $startHour
      endHour: $endHour
    ) {
      hours
    }
  }
`;
