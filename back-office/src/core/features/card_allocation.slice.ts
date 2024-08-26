import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { BaseResponse } from "./base_response";
import { CardAllocationDto } from "../models/card_allocation.dto";
import { WsMessage } from "../models/error.dto";
import { errorTrasform } from "./error_transformer";

export const cardAllocationApi=createApi({
    baseQuery:fetchBaseQuery({baseUrl:'/v1'}),
    reducerPath: "cardAllocationApi",
    tagTypes: ["cardAllocationApi", "cardApi","security"],
    endpoints: (builder)=>({
        getCardAllocation:builder.query<BaseResponse<CardAllocationDto[]>,string>({
            query:()=>'card_allocation/all',
            transformErrorResponse: errorTrasform,
            providesTags:['cardApi', 'cardAllocationApi',"security"]
        }),
        getCardAllocationDetails:builder.query<BaseResponse<CardAllocationDto>,string>({
            query:(id)=>`card_allocation/details/${id}`,
            transformErrorResponse: errorTrasform,
            providesTags:['cardApi', 'cardAllocationApi',"security"]
        }),
        createAllocation:builder.mutation<WsMessage,CardAllocationDto>({
            query:(body)=>({
                url:'card_allocation/create',
                method:'POST',
                body:body
            }),
            invalidatesTags:['cardAllocationApi'],
            transformErrorResponse: errorTrasform,
        }),
        acceptAllocation:builder.mutation<WsMessage,{id:number, motif:string}>({
            query:(body)=>({
                url:'card_allocation/accept',
                method:'POST',
                body:body
            }),
            invalidatesTags:['cardAllocationApi','cardApi'],
            transformErrorResponse: errorTrasform,
        }),
        rejectAllocation:builder.mutation<WsMessage,{id:number, motif?:string}>({
            query:(body)=>({
                url:'card_allocation/reject',
                method:'POST',
                body:body
            }),
            invalidatesTags:['cardAllocationApi','cardApi'],
            transformErrorResponse: errorTrasform,
        })
    })
})
export const {useGetCardAllocationQuery,useCreateAllocationMutation, useAcceptAllocationMutation, useRejectAllocationMutation, useGetCardAllocationDetailsQuery}=cardAllocationApi;