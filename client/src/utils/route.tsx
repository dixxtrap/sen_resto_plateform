import { createBrowserRouter } from "react-router-dom";
import Home from "../interface/pages/home";
import { MainPage } from "../interface/pages/main_page";
import { PlateList } from "../interface/pages/plate/plate";

export const router = createBrowserRouter([
  {
    path: "",
    element: <MainPage />,
    children: [
      {
        path: "",
        index: true,
        element: <Home />,
      },
      {
        path: "plate",
        element: <PlateList />,
      },
    ],
  },
]);
