import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Reservation } from "../views/Reservation";

export const Dashboard = () => {
  return (
    <div className="p-0 h-100 d-flex flex-column justify-content-center">
      <Header />
      <Reservation />
      <Footer />
    </div>
  );
};
