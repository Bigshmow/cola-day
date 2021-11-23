import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../../store/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";

type FormData = {
  email: string;
  password: string;
};

export const LoginForm = () => {
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
    <form onSubmit={handleSubmit(onSubmit)} className="mt-auto mb-auto">
      <div className="d-flex flex-column card">
        <div className="card-body d-flex flex-column">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              <FontAwesomeIcon icon={faEnvelope} />
            </span>
            <input
              {...register("email", { required: true })}
              name="email"
              type="email"
              className="form-control"
              id="email"
              placeholder="email@address.com"
              aria-label="email@address.com"
              aria-describedby="basic-addon1"
            />
            {formErrors.email && <span>This field is required</span>}
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon2">
              <FontAwesomeIcon icon={faKey} />
            </span>
            <input
              {...register("password", { required: true, minLength: 8 })}
              name="password"
              type="password"
              className="form-control"
              id="password"
              placeholder="password"
              aria-label="password"
              aria-describedby="basic-addon2"
            />
            {formErrors.password?.type === "minLength" ? (
              <span>Password min length 8</span>
            ) : (
              formErrors.password && <span>This field is required</span>
            )}
          </div>
          <button className="btn btn-primary" type="submit" disabled={loading}>
            Sign in
          </button>
        </div>
      </div>
    </form>
  );
};
