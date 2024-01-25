import { RouteObject } from "react-router-dom";

import { CustomerList } from "../pages/customer/customer_list";
import { CustomerEdit } from "../pages/customer/customer_edit";
import { CustomerCreate } from "../pages/customer/customer_create";
import { CustomerDetails } from "../pages/customer/customer_details";


export const customerRouter:RouteObject={
path:"customer",
children:[
        {
                path:""
                ,index:true,
                element:<CustomerList/>
        },
        {
                path:"edit:id",
                element:<CustomerEdit/>
        },
        {
                path:"create",
                element:<CustomerCreate/>
        },
        {
                path:"details:id",
                element:<CustomerDetails/>
        }
]
}