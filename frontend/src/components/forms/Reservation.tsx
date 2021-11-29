import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faDoorClosed } from "@fortawesome/free-solid-svg-icons";
import { useMutation, useQuery } from "@apollo/client";
import {
  GET_ALL_ROOMS,
  GET_ALL_ROOMS_RESERVATION_HOURS,
} from "../../graphql/queries";
import { useMemo, useState } from "react";
import { getHours } from "../../functional/getTimes";
import { CREATE_RESERVATION } from "../../graphql/mutations";

type FormData = {
  room: number;
  start: number;
  end: number;
};

export const ReservationForm = () => {
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

  //   TODO: submit form with start and end
  const [createReservation, { loading: resLoading, error: resError }] =
    useMutation(CREATE_RESERVATION, {
      refetchQueries: [
        {
          query: GET_ALL_ROOMS_RESERVATION_HOURS,
        },
      ],
      onCompleted() {
        alert(`Reservation Success!`);
      },
      onError(error) {
        console.log(error.message);
      },
    });

  const onSubmit = handleSubmit(({ room, start, end }) => {
    createReservation({
      variables: {
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
        <div className="card-body d-flex flex-row">
          <div className="input-group mb-3">
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
          <div className="input-group mb-3">
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
          <div className="input-group mb-3">
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
        {formErrors.room && <span>This field is required</span>}
        {formErrors.start && <span>Start hour must be less than end</span>}
        {resError && <span>{resError?.message}</span>}
        <button
          className="btn btn-primary mb-3"
          type="submit"
          disabled={!formErrors ? true : resLoading}
        >
          Submit
        </button>
      </div>
    </form>
  );
};
