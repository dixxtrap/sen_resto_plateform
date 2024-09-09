import { RouteObject } from "react-router-dom";
import { CityList } from "../pages/city/city_list";

export const cityRouter: RouteObject = {
    path: 'city',
    children:[
        {path:'', element:<CityList/>}
    ]
}