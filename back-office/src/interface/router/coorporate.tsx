import { RouteObject } from "react-router-dom";
import { PathRouter } from "./path.route";
import { CoorporateCreate } from "../pages/coorporate/coorporate_create";
import { CoorporateEdit } from "../pages/coorporate/coorporate_edit";
import { CoorporateList } from "../pages/coorporate/coorporate_list";
import { CoorporateDetails } from "../pages/coorporate/coorporate_details";

export const coorporateRouter: RouteObject = {
  path: PathRouter.coorporate,
  children: [
    {
      path: PathRouter.default,
      index: true,
      element: <CoorporateList />,
    },
    {
      path: PathRouter.edit,
      element: <CoorporateEdit />,
    },
    {
      path: PathRouter.create,
      element: <CoorporateCreate />,
    },
    {
        path: PathRouter.details,
        element: <CoorporateDetails />,
      },
  ],
};