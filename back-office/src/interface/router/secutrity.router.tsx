import { RouteObject } from "react-router-dom";
import { RoleList } from "../pages/security/role/role_list";
import { RoleDetails } from "../pages/security/role/role_details";
import { RoleEdit } from "../pages/security/role/role_edit";
import { RolePermissionEdit } from "../pages/security/role/role_permission";

export const securityRouter: RouteObject = {
  path: "security",
  children: [
    {
      path: "",

      children: [
        { path: "", index: true, element: <RoleList /> },
       
        { path: "role/edit/:id", element: <RoleEdit /> },
        { path: "role/permission/:id", element: <RolePermissionEdit /> },
        { path: "role/details/:id", element: <RoleDetails /> },
      ],
    },
    {
      path: "permission",

      children: [
        { path: "", index: true, element: <RoleList /> },
       
        { path: "role/details", element: <RoleDetails /> },
      ],
    },
  ],
};
