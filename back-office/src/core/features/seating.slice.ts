import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { Seatingto } from "../models/seating.dto";
import { BaseResponse } from "./base_response";
import { WsMessage } from "../models/error.dto";

export const seatingApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: "/v1" }),
    reducerPath: "seating",
    tagTypes: ["seating", 'security'], 
    endpoints: (builder) => ({
        getSeating:builder.query<BaseResponse<Seatingto[]>, void>({
            query:()=>"/seating/all",
            providesTags:["seating"]
        }),
        create:builder.mutation<WsMessage, Seatingto>({
            query:(body)=>({url:"/seating/create",method:"POST",body}),
            invalidatesTags:["seating"]
        }),
        update:builder.mutation<WsMessage, {id:number,body:Seatingto}>({
            query:({id,body})=>({url:`/seating/update/${id}`,method:"PUT",body}),
            invalidatesTags:["seating"]
        })
    })
});