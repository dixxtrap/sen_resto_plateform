
import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { BaseResponse } from "./base_response";
import { axiosBaseQuery } from "./axios_base_query";
import { WsMessage } from "../models/error.dto";
import { errorTrasform } from "./error_transformer";
import { StoryDto } from "../models/story.dto";

export const storyApi = createApi({
  baseQuery: axiosBaseQuery({ baseUrl: "/v1" }),
  reducerPath: "story",
  tagTypes: ["story", "security"],
  endpoints: (builder) => ({
    create:builder.mutation<WsMessage, FormData>({
        
        query:(body)=>({
           
            url:"/story/create",
            data:body,
            method:"POST",
            headers:{
              "Content-Type": "multipart/form-data",
             },
        }),
        transformErrorResponse: errorTrasform,
        invalidatesTags:['story']
    }),
    delete:builder.mutation<WsMessage, string>({
      query:(id)=>({url:`/story/delete/${id}`,method:'DELETE'}),
      transformErrorResponse: errorTrasform,
    invalidatesTags:['story']
    }),
getAll:builder.query<BaseResponse<StoryDto[]>, "">({
  query:()=>({url:'/story/all',method:'GET'}),
  transformErrorResponse: errorTrasform,
providesTags:['story']
})
  })})

