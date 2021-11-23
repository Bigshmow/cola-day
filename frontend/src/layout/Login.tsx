import { Footer } from "../components/Footer";
import { LoginView } from "../views/Login";

export const LoginLayout = () => {
  return (
    <div className="p-0 h-100 d-flex flex-column justify-content-center">
      <LoginView />
      <Footer />
    </div>
  );
};
