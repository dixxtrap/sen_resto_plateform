import React from "react";
import Header from "../components/header";
import { Outlet } from "react-router-dom";

export const MainPage = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};
