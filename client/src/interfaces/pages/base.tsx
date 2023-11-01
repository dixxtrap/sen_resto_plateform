
import { Outlet } from "react-router-dom";
import { Header } from "../components/header";

export const BasePage = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};
