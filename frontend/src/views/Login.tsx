import { LoginForm } from "../components/forms/Login";

export const LoginView = () => {
  return (
    <div className="p-5 mt-auto mb-auto d-flex flex-column align-items-center">
      <h1 className="m-5 text-center">Login</h1>
      <LoginForm />
    </div>
  );
};
