import { EditReservationForm } from "../../components/forms/EditReservation";
import { RoomsTable } from "../../components/tables/GlobalRooms";

export const EditReservationView = () => {
  return (
    <div className="d-flex p-3 flex-column align-items-center">
      <EditReservationForm />
      <RoomsTable />
    </div>
  );
};
