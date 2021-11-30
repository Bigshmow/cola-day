import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faDoorClosed } from "@fortawesome/free-solid-svg-icons";
import { useMutation, useQuery } from "@apollo/client";
import {
  GET_ALL_ROOMS,
  GET_ALL_ROOMS_RESERVATION_HOURS,
  GET_RESERVATIONS_BY_ORG_ID,
} from "../../graphql/queries";
import { useMemo, useState } from "react";
import { getHours } from "../../functional/getTimes";
import { EDIT_RESERVATION } from "../../graphql/mutations";
import { useNavigate, useParams } from "react-router";

type FormData = {
  room: number;
  start: number;
  end: number;
};

export const EditReservationForm = () => {
  let navigate = useNavigate();
  const { resId, room, resStart, resEnd } = useParams();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors: formErrors },
  } = useForm<FormData>();

  const end = watch("end");

  const { loading, error, data } = useQuery(GET_ALL_ROOMS);
  const roomNumbers = useMemo(() => {
    return data?.getAllRooms;
  }, [data]);

  //   TODO: edit reservation
  const [editReservation, { loading: resLoading, error: resError }] =
    useMutation(EDIT_RESERVATION, {
      refetchQueries: [
        {
          query: GET_ALL_ROOMS_RESERVATION_HOURS,
        },
        {
          query: GET_RESERVATIONS_BY_ORG_ID,
        },
      ],
      onCompleted() {
        navigate("/dashboard/organization");
      },
      onError(error) {
        console.log(error.message);
      },
    });

  const onSubmit = handleSubmit(({ room, start, end }) => {
    editReservation({
      variables: {
        resId,
        roomId: room,
        start: Number(start),
        end: Number(end - 1),
        startHour: hours[start],
        endHour: hours[end],
      },
    });
    // console.log(room, start, end)
  });

  const [hours] = useState(getHours());

  if (loading) return <div>Loading rooms...</div>;
  if (error) return <div>Error fetching rooms...{console.log(error)}</div>;

  return (
    <form onSubmit={onSubmit}>
      <div className="card d-flex flex-column align-items-center">
        <div className="card-body d-flex flex-column p-0">
          <div className="card-header text-center w-100">
            <h2>Make a reservation</h2>
          </div>
          <div className="d-flex flex-row">
            <div className=" input-group mb-3 d-flex flex-column">
              <div className="text-center">Current Room</div>
              <div className="text-center">{room}</div>
              <div className="d-flex flex-row">
                <span className="input-group-text" id="basic-addon1">
                  <FontAwesomeIcon icon={faDoorClosed} />
                </span>
                <select
                  {...register("room", { required: true })}
                  name="room"
                  className="form-control"
                >
                  {roomNumbers.map(
                    (room: { number: number; _id: string }, i: number) => {
                      return (
                        <option key={i} value={room._id}>
                          {room.number}
                        </option>
                      );
                    }
                  )}
                </select>
              </div>
            </div>
            <div className=" input-group mb-3 d-flex flex-column">
              <div className="text-center">Start</div>
              <div className="text-center">{resStart}</div>
              <div className="d-flex flex-row">
                <span className="input-group-text" id="basic-addon1">
                  <FontAwesomeIcon icon={faClock} />
                </span>
                <select
                  {...register("start", { required: true, max: end - 1 })}
                  name="start"
                  className="form-control"
                >
                  {hours.map((time: string, i: number) => {
                    return (
                      <option key={i} value={i}>
                        {time}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className=" input-group mb-3 d-flex flex-column">
              <div className="text-center">End</div>
              <div className="text-center">{resEnd}</div>
              <div className="d-flex flex-row">
                <span className="input-group-text" id="basic-addon1">
                  <FontAwesomeIcon icon={faClock} />
                </span>
                <select
                  {...register("end", { required: true })}
                  name="end"
                  className="form-control"
                >
                  {hours.map((time: string, i: number) => {
                    return (
                      <option key={i} value={i}>
                        {time}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>
          {formErrors.room && (
            <span className="text-center">This field is required</span>
          )}
          {formErrors.start && (
            <span className="text-center">
              Start hour must be less than end
            </span>
          )}
          {resError && <span className="text-center">{resError?.message}</span>}
          <div className="d-flex justify-content-center">
            <button
              className="btn btn-primary mb-3 w-25"
              type="submit"
              disabled={!formErrors ? true : resLoading}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
