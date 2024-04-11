import { RouteObject } from "react-router-dom";
import { PathRouter } from "./path.route";
import { CardAllocationList } from "../pages/card_allocation/card_allocation_list";
import { CardAllocationCreate } from "../pages/card_allocation/card_allocation_create";
import { CardAllocationDetails } from "../pages/card_allocation/card_allocation_details";

export const cardAllocationRouter:RouteObject={
    path:PathRouter.cardAllocation,
children:[
    {
        path:PathRouter.default,
        index:true,
        element:<CardAllocationList/>
    },
    {
        path:PathRouter.create,
        element:<CardAllocationCreate/>
    },
    {
        path:PathRouter.details,
        element:<CardAllocationDetails/>
    }
]
}