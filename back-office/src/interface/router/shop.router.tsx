import { RouteObject } from "react-router-dom";
import {ShopList } from "../pages/shop/shop_list";
import {ShopCreate } from "../pages/shop/shop_create";
import {ShopDetails } from "../pages/shop/shop_details";
import {ShopEdit } from "../pages/shop/shop_edit";

export const  shopRouter:RouteObject={
        path:"shop",
        children:[
                {
                        path:"",
                        index:true,
                        element:<ShopList/>
                },
                {
                        path:"create",
                      
                        element:<ShopCreate/>
                },
                {
                        path:"details/:id",
                      
                        element:<ShopDetails/>
                },
                
                {
                        path:"edit/:id",
                      
                        element:<ShopEdit/>
                },
        ]
}