import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"
import { BaseResponse } from "./base_response"
import { OrderDto } from "../models/order.dto"

export const orderApi=createApi({
    baseQuery: fetchBaseQuery({ baseUrl: '/v1' }),
    endpoints: (build)=> ({
     getOrders:build.query<BaseResponse<OrderDto[]>,''>({
        query:()=>'/order/all'
     })
    })
})