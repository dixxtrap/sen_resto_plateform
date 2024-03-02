import { RouteObject } from "react-router-dom";
import { CardList } from "../pages/card/card_list";
import { CardCreate } from "../pages/card/card_create";
import { CardDetails } from "../pages/card/card_details";

export const cardRouter:RouteObject={
        path:"card",
        children:[
                {path:"",
                 element:<CardList/> , 
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