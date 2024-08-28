import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { CompanyDto } from "../models/company.dto";
import { WsMessage } from "../models/error.dto";
import { BaseResponse } from "./base_response";
import { axiosBaseQuery } from "./axios_base_query";
import { errorTrasform } from "./error_transformer";

export const coorporateApi = createApi({
  reducerPath: "coorporate",
  baseQuery: axiosBaseQuery({ baseUrl: "/v1" }),
  tagTypes: ["coorporate",'security'],

  endpoints: (builder) => ({
    createCoorporate: builder.mutation<CompanyDto| WsMessage, CompanyDto>({
      query: (coorporate: CompanyDto) => ({
        url: "/coorporate/create",
        method: "POST",
        data: coorporate,
      }),
      transformErrorResponse: errorTrasform,
      invalidatesTags: ["coorporate", 'security'],
    }),
    getCoorporate:builder.query<BaseResponse<CompanyDto[]>,string>({
        query:()=>({url:"/coorporate/all"}),
        providesTags:["coorporate",'security'],
        transformErrorResponse: errorTrasform,
}),

getCoorporateById: builder.query<BaseResponse<Partial<CompanyDto>> ,string>({
        query: (id)=>({url:`/coorporate/byId/${id}`}),
        providesTags:["coorporate",'security'],
        transformErrorResponse: errorTrasform,
}),
updateCoorporateById: builder.mutation<BaseResponse<CompanyDto>, { id: number, coorporate: CompanyDto, file:File }>({
        query: ({id,coorporate, file}) => ({
          url: `/coorporate/update/${id}`,
          method: "PUT",
          data: {...coorporate, file},
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }),
        transformErrorResponse: errorTrasform,
        invalidatesTags: ["coorporate",'security'],
      }),
  }),
});


export const {useCreateCoorporateMutation, useGetCoorporateQuery, useGetCoorporateByIdQuery, useUpdateCoorporateByIdMutation}=coorporateApi