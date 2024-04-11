import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { CardDto } from "../models/card.dto";
import { BaseResponse } from "./base_response";

export const cardApi=createApi({
    baseQuery:fetchBaseQuery({baseUrl:'/v1'}),
    reducerPath: "cardApi",
    tagTypes: ["cardApi", "security","cardAllocationApi"],
    endpoints: (builder)=>({
        getCard:builder.query<BaseResponse<CardDto[]>,string>({
            query:()=>'card/all',
            providesTags:['cardApi','cardAllocationApi',"security"]
        })
        
    })
})
export const {useGetCardQuery}=cardApi;