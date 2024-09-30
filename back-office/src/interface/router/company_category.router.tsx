import { RouteObject } from "react-router-dom";
import { PathRouter } from "./path.route";
import { CompanyCategoryList } from "../pages/company_category/company_category_list";

export const companyCategoryRouter: RouteObject = {
    path: PathRouter.company_category,
    children:[
        {
            index:true,
            path:"",
            element:<CompanyCategoryList/>
        }
    ]
}