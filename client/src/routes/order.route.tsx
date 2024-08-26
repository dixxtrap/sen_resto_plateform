import { RouteObject } from "react-router-dom";
import { OrderList } from "../interfaces/pages/order/order_list";

export const orderRoute:RouteObject={
    path:'order',
    children:[
        {path:''
            ,index:true,
            element:<OrderList/>
        }
    ]
}