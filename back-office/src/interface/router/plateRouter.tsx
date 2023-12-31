import { RouteObject } from "react-router-dom";
import { PlateList } from "../pages/plates/plates_list";
import { PlateCreate } from "../pages/plates/plates_create";
import { PlatesDetails } from "../pages/plates/plates_details";
import { PlatesEdit } from "../pages/plates/plates_edit";

export const plateRouter:RouteObject={
        path:"plate",
        children:[
                {
                        path:"",
                        index:true,
                        element:<PlateList/>
                },
                {
                        path:"create",
                        element:<PlateCreate/>
                },
                {
                        path:"details/:id",
                        element:<PlatesDetails/>
                },
                {
                        path:"edit/:id",
                        element:<PlatesEdit/>
                }
        ]
}