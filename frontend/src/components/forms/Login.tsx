import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../../store/user";

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="d-flex flex-column card">
        <div className="card-body d-flex flex-column align-items-center">
          <div className="form-group mb-3 w-100 d-flex flex-row justify-content-between align-items-center">
            <label htmlFor="email">Email</label>
            <input
              {...register("email", { required: true })}
              name="email"
              type="email"
              id="email"
              className="form-control w-75 ms-auto"
              placeholder="name@address.com"
            />
            {formErrors.email && <span>This field is required</span>}
          </div>
          <div className="form-group mb-3 w-100 d-flex flex-row align-items-center">
            <label htmlFor="email">Password</label>
            <input
              {...register("password", { required: true, minLength: 8 })}
              name="password"
              type="password"
              id="password"
              className="form-control w-75 ms-auto"
              placeholder="********"
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
