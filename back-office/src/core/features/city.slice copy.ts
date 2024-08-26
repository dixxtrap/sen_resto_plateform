import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { errorTrasform } from "./error_transformer";
import { BaseResponse } from "./base_response";
import { PaginationDto } from "./pagination";
import { City } from "../models/city.dto";


export const cityApi =createApi({
    baseQuery: fetchBaseQuery({ baseUrl: "/v1/" }),
    reducerPath: "city",
    tagTypes: ["city"],
    endpoints:(builder) =>({
        get:builder.query<BaseResponse<[City]>,PaginationDto>({
            query:(pagination)=>({url:`city/all?page=${pagination.page}&perPage=${pagination.perPage}`})
            ,
            transformErrorResponse: errorTrasform,
            providesTags: ["city"],
        }),
        getRegion:builder.query<BaseResponse<[City]>,"">({
            query:()=>({url:`city/region`})
            ,
            transformErrorResponse: errorTrasform,
            providesTags: ["city"],
        }),
        getDepartement:builder.query<BaseResponse<[City]>,string>({
            query:(id)=>({url:`city/children/${id}`})
            ,
            transformErrorResponse: errorTrasform,
            providesTags: ["city"],
        }),
    })
})