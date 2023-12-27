import { RouteObject } from "react-router-dom";
import { OrganisationCreate } from "../pages/organisation/organisation_create";
import { OrganisationEdit } from "../pages/organisation/organisation_edit";
import { OrganisationDetails } from "../pages/organisation/organisation_details";


export const customerRouter:RouteObject={
path:"customer",
children:[
        {
                path:""
                ,index:true,
                element:<OrganisationCreate/>
        },
        {
                path:"edit:id",
                element:<OrganisationEdit/>
        },
        {
                path:"create",
                element:<OrganisationCreate/>
        },
        {
                path:"details:id",
                element:<OrganisationDetails/>
        }
]
}