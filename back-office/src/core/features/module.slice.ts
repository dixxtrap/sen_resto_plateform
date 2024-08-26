import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { ModuleDto } from "../models/module.dto";

export const moduleApi=createApi({
        baseQuery:fetchBaseQuery({baseUrl:"/v1"}),
        reducerPath:"moduleApi",
        endpoints:(builder)=>({
                getModule:builder.query<ModuleDto[], string>({
                        query:()=>"module/all"
                })
        })
})

export const {useGetModuleQuery}=moduleApi