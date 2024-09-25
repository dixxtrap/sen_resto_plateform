import { RouteObject } from "react-router-dom";
import { PathRouter } from "./path.route";
import { EstablishmentTypeList } from "../pages/establishment_type/establishment_type_list";

export const establishmentTypeRouter: RouteObject = {
    path: PathRouter.establishmentType,
    children:[
        {
            index:true,
            path:"",
            element:<EstablishmentTypeList/>
        }
    ]
}