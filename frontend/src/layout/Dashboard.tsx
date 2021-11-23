import { Outlet } from "react-router";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export const Dashboard = () => {
  return (
    <div className="p-0 h-100 d-flex flex-column justify-content-center">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
