import { RouteObject } from "react-router-dom";
import { PermissionList } from "../pages/security/permission/permission_list";
import { PermissionCreate } from "../pages/security/permission/permision_create";

export const permissionRouter:RouteObject={
        path:"permission"
        ,children:[
                {
                        path:"",
                        index:true,
                        element:<PermissionList/>,
                }
                , {
                        path:"create",
                        index:true,
                        element:<PermissionCreate/>,
                },
                {
                        path:"update/:id",
                        index:true,
                        element:<PermissionList/>,
                }
        ]

}

