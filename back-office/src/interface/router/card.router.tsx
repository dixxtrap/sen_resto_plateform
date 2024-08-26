import { RouteObject } from "react-router-dom";
import { CardCreate } from "../pages/card/card_create";
import { CardDetails } from "../pages/card/card_details";
import { CardHome } from "../pages/card/card_home";

export const cardRouter:RouteObject={
        path:"card",
        children:[
                {path:"",
                 element:<CardHome/> , 
                 index:true
                },
                 {
                        path:"create",
                        element:<CardCreate/>
                 },
                 {
                        path:"details/:id",
                        element:<CardDetails/>
                 }
        ]
}