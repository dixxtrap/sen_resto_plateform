import { RouteObject } from "react-router-dom";
import { PathRouter } from "./path.route";
import { BannerList } from "../pages/banner/banner_list";
import { BannerCreate } from "../pages/banner/banner_create";
import { BannerDetails } from "../pages/banner/banner_details";
import { BannerEdit } from "../pages/banner/banner_edit";

export const bannerRouter: RouteObject = {
  path: PathRouter.banner,
  children: [
    {
      path: PathRouter.default,
      index: true,
      element: <BannerList />,
    },
    {
      path: PathRouter.create,
      element: <BannerCreate />,
    },
    {
      path: PathRouter.details,
      element: <BannerDetails />,
    },
    {
        path: PathRouter.edit,
        element: <BannerEdit />,
      },
  ],
};