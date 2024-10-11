import { createBrowserRouter } from "react-router-dom";
import { BasePage } from "../interfaces/pages/base";
import Home from "../interfaces/pages/home/home";
import { PlateList } from "../interfaces/pages/product/product";
import { Restaurant } from "../interfaces/pages/restaurant_list";
import { orderRoute } from "./order.route";
import { Company } from '../interfaces/pages/company/company';
import { CompanyDetails } from "../interfaces/pages/company/company_details";
import { UserProfile } from "../interfaces/components/header/widget/user_profile";

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
        path: "profile",
        element: <UserProfile/>,
      },
      {
        path: "product",
        element: <PlateList />,
      },
      {
        path: "restaurant",
        element: <Restaurant />,
      },
      {
        path: "establishment/:id",
        element: <Company />,
      },
      {
        path: "company/details/:id",
        element: <CompanyDetails />,
      },
      orderRoute
    ],
  },
]);
