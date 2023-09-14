import { RouteObject } from "react-router-dom";
import { RoleList } from "../pages/security/role/role_list";
import { RoleCreate } from "../pages/security/role/role_create";
import { RoleDetails } from "../pages/security/role/role_details";
import { RoleEdit } from "../pages/security/role/role_edit";

export const securityRouter: RouteObject = {
  path: "security",
  children: [
    {
      path: "",
  
      children: [{ path: "", index: true, element: <RoleList /> },
      { path: "role/create", element: <RoleCreate /> },
      { path: "role/edit/:id", element: <RoleEdit /> },
      { path: "role/details/:id", element: <RoleDetails /> }],
    },
    {
        path: "permission",
    
        children: [{ path: "", index: true, element: <RoleList /> },
        { path: "permission/create", element: <RoleCreate /> },
        { path: "role/details", element: <RoleDetails /> }],
      },
  ],
};
