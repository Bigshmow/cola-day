import { Link } from "react-router-dom";

export const EditButton = ({ resId, room, resStart, resEnd }: any) => {
  return (
    <Link
      to={`/dashboard/edit/reservation/${resId}/${room}/${resStart}/${resEnd}`}
    >
      <button className="btn btn-info">Edit</button>
    </Link>
  );
};
