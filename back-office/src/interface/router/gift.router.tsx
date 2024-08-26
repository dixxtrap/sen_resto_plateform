import { RouteObject } from "react-router-dom";
import { PathRouter } from "./path.route";
import { GiftCreate } from "../pages/gift/gift_create";
import { GiftList } from "../pages/gift/gitf_list";
import { GiftEdit } from "../pages/gift/gift_edit";
import { GiftDetails } from "../pages/gift/gift_details";

export const giftRouter:RouteObject={
    path:PathRouter.gift,
    children:[
        {
            path:PathRouter.default,
            index:true,
            element:<GiftList/>
        },
        {
        path:PathRouter.create,
        element:<GiftCreate/>
    },
    {
        path:PathRouter.edit,
        element:<GiftEdit/>
    },
    {
        path:PathRouter.details,
        element:<GiftDetails/>
    }
]
}