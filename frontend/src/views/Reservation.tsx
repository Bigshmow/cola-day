import { ReservationForm } from "../components/forms/Reservation";
import { RoomsTable } from "../components/tables/Rooms";

export const ReservationView = () => {
  return (
    <div className="d-flex p-3 flex-column align-items-center">
      <ReservationForm />
      <RoomsTable />
    </div>
  );
};
