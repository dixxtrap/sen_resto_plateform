import { RouteObject } from "react-router-dom";
import { PathRouter } from "./path.route";
import { StoryCreate } from "../pages/story/story_create";
import { StoryList } from "../pages/story/story_list";
import { StoryHistory } from "../pages/story/story.history";

export const storeRouter:RouteObject={
    path:PathRouter.story,
    children:[
        {
            path:PathRouter.default,
            index:true,
            element:<StoryList/>
        },
        {
        path:PathRouter.create,
        element:<StoryCreate/>
    },
    {
        path:PathRouter.list,
        element:<StoryHistory/>
    },
   
]
}