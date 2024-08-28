import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { ModuleDto } from "../models/module.dto";
import { errorTrasform } from "./error_transformer";

export const moduleApi=createApi({
        baseQuery:fetchBaseQuery({baseUrl:"/v1"}),
        reducerPath:"moduleApi",
        endpoints:(builder)=>({
                getModule:builder.query<ModuleDto[], string>({
                        query:()=>"module/all",
                        transformErrorResponse: errorTrasform,
                })
        })
})

export const {useGetModuleQuery}=moduleApi