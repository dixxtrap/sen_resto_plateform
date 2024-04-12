import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { Customer } from "../models/customer";
import { WsMessage } from "../models/error.dto";

export const securityApi=createApi({
        baseQuery: fetchBaseQuery({ baseUrl: "/v1" }),
        reducerPath:"security",
        tagTypes:["security"],
        endpoints: (builder)=>({
                profile:builder.query<Customer, string>({
                   query:() => "ws/customer/profile",
                   providesTags:['security'],

          }),
          login:builder.mutation<WsMessage,{username:string,password:string}>({
query:(body)=>({
        url:`/ws/customer/login`,
        body:body,
        method:"POST",

}),
invalidatesTags:['security']
          })
        })
})


export const {useLoginMutation, useProfileQuery}=securityApi;