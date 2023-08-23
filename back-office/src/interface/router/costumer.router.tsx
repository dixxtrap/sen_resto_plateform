import { RouteObject } from "react-router-dom";
import { CustomerList } from "../pages/customer/customer_list";
import { CustomerCreate } from "../pages/customer/customer_create";
import { CustomerEdit } from "../pages/customer/customer_edit";
import { CustomerDetails } from "../pages/customer/customer_details";


export const customerRouter:RouteObject={
path:"customer",
children:[
        {
        path:"",index:true,
        element:<CustomerList/>
},
{
        path:"create",
        element:<CustomerCreate/>
},
{
        path:"edit/:id",
        element:<CustomerEdit/>
},
{
        path:"details/:id",
        element:<CustomerDetails/>
},
]
}