import React from "react";
import { clsx } from "../utils/clsx";
import logo from "../../assets/svg/logo.svg";
export const Logo = ({ className = "h-9 w-9" }: { className?: string }) => {
  return <img src={logo} className={className} />; 
};
