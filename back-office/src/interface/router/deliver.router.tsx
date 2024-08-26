import { RouteObject } from "react-router-dom";
import { DeliverList } from "../pages/deliver/deliver_list";
import { DeliverEdit } from "../pages/deliver/deliver_edit";
import { DeliverCreate } from "../pages/deliver/deliver_create";
import { DeliverDetails } from "../pages/deliver/deliver_details";

export const deliverRouter:RouteObject={
        path:"deliver",
        children:[
                {
                        path:""
                        ,index:true,
                        element:<DeliverList/>
                },
                {
                        path:"edit/:id",
                        element:<DeliverEdit/>
                },
                {
                        path:"create",
                        element:<DeliverCreate/>
                },
                {
                        path:"details/:id",
                        element:<DeliverDetails/>
                }
        ]
}