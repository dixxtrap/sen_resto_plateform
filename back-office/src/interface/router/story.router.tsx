import { RouteObject } from "react-router-dom";
import { PathRouter } from "./path.route";
import { StoreCreate } from "../pages/story/story_create";
import { StoreList } from "../pages/story/story_list";
import { StoreHistory } from "../pages/story/story.history";

export const storeRouter:RouteObject={
    path:PathRouter.story,
    children:[
        {
            path:PathRouter.default,
            index:true,
            element:<StoreList/>
        },
        {
        path:PathRouter.create,
        element:<StoreCreate/>
    },
    {
        path:PathRouter.list,
        element:<StoreHistory/>
    },
   
]
}