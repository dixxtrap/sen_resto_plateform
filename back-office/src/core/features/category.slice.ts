import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { CategoryDto } from "../models/category.dto";

export const categoryApi=createApi({
        baseQuery:fetchBaseQuery({baseUrl:"/v1"}),
        reducerPath:"category",
        tagTypes:["category"],
        endpoints:(builder)=>({
                getCategory:builder.query<CategoryDto[], string>({
                        query:()=>"/category/all"
                        , providesTags:["category"]
                })
        })
})
export const  { useGetCategoryQuery }=categoryApi;