import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { PathRouter } from "../../interface/router/path.route";
import { WsMessage } from "../models/error.dto";
import { CompanyCategoryDto } from "../models/company_category.dto";
import { BaseResponse } from "./base_response";
const invalidatesTags = [PathRouter.company_category, "security"];
export const companyCategoryApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: "/v1/"+PathRouter.company_category }),
    reducerPath: PathRouter.company_category,
    tagTypes: invalidatesTags,
    endpoints: (builder) => ({
        get: builder.query<BaseResponse<CompanyCategoryDto[]>,void>({
            query: () => `/all`,
            providesTags: invalidatesTags
        }),
        create: builder.mutation<WsMessage,CompanyCategoryDto>({
            query: (body) =>({url:'/create', method:"POST",body}),
            invalidatesTags: invalidatesTags
        }),
        update: builder.mutation<WsMessage,{id:string,body:CompanyCategoryDto}>({
            query: ({id,body}) =>({url:`/update/${id}`, method:"PUT",body}),
            invalidatesTags: invalidatesTags
        })
    })
})