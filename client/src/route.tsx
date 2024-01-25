import { createBrowserRouter } from "react-router-dom";
import { BasePage } from "./interfaces/pages/base";
import Home from "./interfaces/pages/home";
import { PlateList } from "./interfaces/pages/product";
import { Restaurant } from "./interfaces/pages/restaurant_list";

export const router = createBrowserRouter([
  {
    path: "",
    element: <BasePage />,
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
      {
        path: "restaurant",
        element: <Restaurant />,
      },
    ],
  },
]);
