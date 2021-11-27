import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../../store/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faDoorClosed } from "@fortawesome/free-solid-svg-icons";

type FormData = {
  room: number;
  start: number;
  end: number;
};

export const ReservationForm = () => {
  const { error: loginError, loading } = useSelector((state: any) => {
    return {
      loading: state.user.userLoginLoading,
      error: state.user.userLoginError,
    };
  });

  const dispatch = useDispatch();

  const loginUserDispatch = useCallback(
    (props) => dispatch(loginUser(props)),
    [dispatch]
  );

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<FormData>();

  const onSubmit = useCallback(
    (data) => loginUserDispatch(data),
    [loginUserDispatch]
  );

  if (loginError) return <div>Error logging in, see console</div>;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="card d-flex flex-column align-items-center">
        <div className="card-body d-flex flex-row">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              <FontAwesomeIcon icon={faDoorClosed} />
            </span>
            <select
              {...(register("room"), { required: true })}
              name="room"
              className="form-control"
              id="room"
              placeholder="Select Room"
              aria-label="room"
              aria-describedby="basic-addon2"
            >
              <option value="female">female</option>
              <option value="male">male</option>
              <option value="other">other</option>
            </select>
            {formErrors.room && <span>This field is required</span>}
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              <FontAwesomeIcon icon={faClock} />
            </span>
            <select
              {...(register("start"), { required: true })}
              name="room"
              className="form-control"
              id="room"
              placeholder="start"
              aria-label="room"
              aria-describedby="basic-addon2"
            >
              <option value="female">female</option>
              <option value="male">male</option>
              <option value="other">other</option>
            </select>
            {formErrors.room && <span>This field is required</span>}
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              <FontAwesomeIcon icon={faClock} />
            </span>
            <select
              {...(register("end"), { required: true })}
              name="room"
              className="form-control"
              id="room"
              placeholder="end"
              aria-label="room"
              aria-describedby="basic-addon2"
            >
              <option value="female">female</option>
              <option value="male">male</option>
              <option value="other">other</option>
            </select>
            {formErrors.room && <span>This field is required</span>}
          </div>
        </div>
        <button className="btn btn-primary" type="submit" disabled={loading}>
          Submit
        </button>
      </div>
    </form>
  );
};
