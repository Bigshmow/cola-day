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

export const EDIT_RESERVATION = gql`
  mutation editReservation(
    $resId: ID
    $roomId: ID
    $start: Int
    $end: Int
    $startHour: String
    $endHour: String
  ) {
    editReservation(
      resId: $resId
      roomId: $roomId
      start: $start
      end: $end
      startHour: $startHour
      endHour: $endHour
    )
  }
`;

export const DELETE_RESERVATION = gql`
  mutation deleteReservation($resId: ID) {
    deleteReservation(resId: $resId)
  }
`;
