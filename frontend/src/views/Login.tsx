import { LoginForm } from "../components/forms/Login";

export const LoginView = () => {
  return (
    <div className="d-flex flex-column align-items-center p-3">
      <div className="p-5">
        <h1>Welcome to Cola Day</h1>
      </div>
      <LoginForm />
    </div>
  );
};
