import { RouteObject } from "react-router-dom";
import { UserList } from "../pages/user/user_list";
import { UserCreate } from "../pages/user/user_create";
import { UserDetails } from "../pages/user/user_details";

export const userRouter: RouteObject = {
  path: "user",
  children: [
    {
      path: "",
      index: true,
      element: <UserList />,
    },
    {
        path: "create",
        element: <UserCreate />,
      },
      {
        path: "details/:id",
        element: <UserDetails />,
      },
      {
        path: "edit/:id",
        element: <UserDetails />,
      },
  ],
};
