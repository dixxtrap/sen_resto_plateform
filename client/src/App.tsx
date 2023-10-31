import { BrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
import Header from "./interface/components/header";
import Home from "./interface/pages/home";
import { PlateList } from "./interface/pages/plate/plate";
import { router } from "./utils/route";





export default function App(){
  return(
    <>
    <RouterProvider router={router} />
    </>
  )
}