import {  createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { WsMessage } from "../models/error.dto";
import { BaseResponse } from "../models/base_response";
import { OrderDto } from "../models/order.dto";


export const orderApi=createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'v1/' }),
   reducerPath:'order',
    tagTypes:['order'],
    endpoints: (builder)=>({
        getBag:builder.query<BaseResponse<OrderDto[]>, ''>({
            query:()=>'ws/order/bag',
            providesTags:['order']
        }),
        addProduct:builder.mutation<WsMessage, {productId:number, description:string,quantity:number}>({
            query:(body)=>({
                url:'ws/order/product/add',
                method:'POST',
                body:body
            }),
        invalidatesTags:['order']
        })
    })
})

export const {useAddProductMutation, useGetBagQuery}=orderApi