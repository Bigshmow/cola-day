import { useMutation } from "@apollo/client";
import { DELETE_RESERVATION } from "../../graphql/mutations";
import { GET_RESERVATIONS_BY_ORG_ID } from "../../graphql/queries";

export const DeleteButton = ({ resId }: any) => {
  const [deleteReservation, { loading, error }] = useMutation(
    DELETE_RESERVATION,
    {
      onCompleted() {
        alert("Reservation Deleted");
      },
      onError() {
        console.log(error);
      },
      refetchQueries: [
        {
          query: GET_RESERVATIONS_BY_ORG_ID,
        },
      ],
    }
  );

  const handleSubmit = () => {
    deleteReservation({
      variables: {
        resId,
      },
    });
  };

  return (
    <button
      disabled={loading}
      onClick={handleSubmit}
      className="btn btn-warning"
    >
      Delete
    </button>
  );
};
