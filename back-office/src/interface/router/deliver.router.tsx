import { RouteObject } from "react-router-dom";
import { OrganisationCreate } from "../pages/organisation/organisation_create";
import { OrganisationEdit } from "../pages/organisation/organisation_edit";
import { DeliverCompanyDetails } from "../pages/deliver_company/deliver_company_details";
import DeliverCompanyCreate from "../pages/deliver_company/deliver_company_create";
import { DeliverCompanyEdit } from "../pages/deliver_company/deliver_company_edit";
import { DeliverCompanyList } from "../pages/deliver_company/deliver_company_list";

export const deliverRouter:RouteObject={
        path:"deliver",
        children:[
                {
                        path:""
                        ,index:true,
                        element:<DeliverCompanyList/>
                },
                {
                        path:"edit:id",
                        element:<DeliverCompanyEdit/>
                },
                {
                        path:"create",
                        element:<DeliverCompanyCreate/>
                },
                {
                        path:"details:id",
                        element:<DeliverCompanyDetails/>
                }
        ]
}