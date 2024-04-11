import { RouteObject } from "react-router-dom";

import { CustomerList } from "../pages/customer/customer_list";
import { CustomerEdit } from "../pages/customer/customer_edit";
import { CustomerCreate } from "../pages/customer/customer_create";
import { CustomerDetails } from "../pages/customer/customer_details";
import { PathRouter } from "./path.route";


export const customerRouter:RouteObject={
path:"customer",
children:[
        {
                path:PathRouter.default
                ,index:true,
                element:<CustomerList/>
        },
        {
                path:PathRouter.edit,
                element:<CustomerEdit/>
        },
        {
                path:PathRouter.create,
                element:<CustomerCreate/>
        },
        {
                path:PathRouter.details,
                element:<CustomerDetails/>
        }
]
}