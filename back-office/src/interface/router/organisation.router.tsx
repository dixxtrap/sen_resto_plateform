import { RouteObject } from "react-router-dom";
import { OrganisationList } from "../pages/organisation/organisation_list";
import { OrganisationCreate } from "../pages/organisation/organisation_create";
import { OrganisationEdit } from "../pages/organisation/organisation_edit";
import { OrganisationDetails } from "../pages/organisation/organisation_details";

export const organisationRouter: RouteObject = {
  path: "organisation",
  children: [
    {
      path: "",
      index: true,
      element: <OrganisationList />,
    },
    {
      path: "create",
      element: <OrganisationCreate />,
    },
    {
      path: "edit/:id",
      element: <OrganisationEdit />,
    },
    {
      path: "details/:id",
      element: <OrganisationDetails />,
    },
  ],
};
