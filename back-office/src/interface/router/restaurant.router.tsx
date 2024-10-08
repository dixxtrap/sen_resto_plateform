import { RouteObject } from "react-router-dom";
import { RestaurantList } from "../pages/restaurant/restaurant_list";
import { RestaurantCreate } from "../pages/restaurant/restaurant_create";
import { RestaurantDetails } from "../pages/restaurant/restaurant_details";
import { RestaurantEdit } from "../pages/restaurant/restaurant_edit";
import { RestaurantPlatManagement } from "../pages/restaurant/restarant_plate_management";

export const  restaurantRouter:RouteObject={
        path:"restaurant",
        children:[
                {
                        path:"",
                        index:true,
                        element:<RestaurantList/>
                },
                {
                        path:"create",
                      
                        element:<RestaurantCreate/>
                },
                {
                        path:"details/:id",
                      
                        element:<RestaurantDetails/>
                },
                {
                        path:"plats/:id",
                      
                        element:<RestaurantPlatManagement/>
                },
                {
                        path:"edit/:id",
                      
                        element:<RestaurantEdit/>
                },
        ]
}