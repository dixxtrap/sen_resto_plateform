import { RouteObject } from "react-router-dom";
import { PlateList } from "../pages/plates/product_list";
import { PlatesDetails } from "../pages/plates/product_details";
import { PlatesEdit } from "../pages/plates/product_edit";
import { PlateCreate } from "../pages/plates/product_create";

export const plateRouter:RouteObject={
        path:"product",
        children:[
                {
                        path:"",
                        index:true,
                        element:<PlateList/>
                },
                {
                        path:"create",
                        element:<PlateCreate />
                },
                {
                        path:"details/:id",
                        element:<PlatesDetails/>
                },
                {
                        path:"edit/:id",
                        element:<PlatesEdit/>
                },
                
        ]
}