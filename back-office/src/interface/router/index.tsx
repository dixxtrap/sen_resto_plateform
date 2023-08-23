import { createBrowserRouter } from "react-router-dom";
import { Login } from "../pages/login/login";
import Public from "../pages/public/public";
import { organisationRouter } from "./organisation.router";
import { userRouter } from "./user.router";
import { customerRouter } from "./costumer.router";
import { restaurantRouter } from "./restaurant.router";
import { plateRouter } from "./plateRouter";

export const  router=createBrowserRouter([
        {
path:"",
index:true,
element:<Login/>
        },{
                path:"",
                element:<Public/>,
                children:[{
                        path:'dash',
                        element:<div>
                                Dash
                        </div>
                },
                organisationRouter,
                userRouter,
                customerRouter,
                restaurantRouter,
                plateRouter
        ]
        }

]);