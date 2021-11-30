import { Outlet } from "react-router";
import { Header } from "../components/Header";

export const Dashboard = () => {
  return (
    <div className="p-0 d-flex flex-column justify-content-center">
      <Header />
      <Outlet />
    </div>
  );
};
