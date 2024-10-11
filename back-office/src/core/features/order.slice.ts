import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"
import { BaseResponse } from "./base_response"
import { OrderDto, OrderStatus } from "../models/order.dto"
import { errorTrasform } from "./error_transformer"
import { WsMessage } from "../models/error.dto"
export const orderApi=createApi({
    baseQuery: fetchBaseQuery({ baseUrl: '/v1' }),
    reducerPath:"order",
    tagTypes:["order"],
    endpoints: (build)=> ({
     getOrders:build.query<BaseResponse<OrderDto[]>,''>({
        query:()=>'/order/all',
        transformErrorResponse: errorTrasform,
        providesTags:["order"]
         }),
         changeStatus:build.mutation<WsMessage,{id:number, status:OrderStatus}>({
            query:({id, status})=>({url:`/order/change_status/${id}`, body:{status}, method:"PUT"}),
            transformErrorResponse: errorTrasform,
        invalidatesTags:["order"]

             })
    })
})