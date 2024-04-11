import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { CompanyDto } from "../models/company.dto";
import { WsMessage } from "../models/error.dto";
import { BaseResponse } from "./base_response";

export const coorporateApi = createApi({
  reducerPath: "coorporate",
  baseQuery: fetchBaseQuery({ baseUrl: "/v1" }),
  tagTypes: ["coorporate",'security'],

  endpoints: (builder) => ({
    createCoorporate: builder.mutation<CompanyDto| WsMessage, CompanyDto>({
      query: (coorporate: CompanyDto) => ({
        url: "/coorporate/create",
        method: "POST",
        body: coorporate,
      }),
      invalidatesTags: ["coorporate", 'security'],
    }),
    getCoorporate:builder.query<BaseResponse<CompanyDto[]>,string>({
        query:()=>"/coorporate/all",
        providesTags:["coorporate",'security']
}),

getCoorporateById: builder.query<BaseResponse<Partial<CompanyDto>> ,string>({
        query: (id)=>`/coorporate/byId/${id}`,
        providesTags:["coorporate",'security']
}),
updateCoorporateById: builder.mutation<BaseResponse<CompanyDto>, { id: number, coorporate: CompanyDto }>({
        query: ({id,coorporate}) => ({
          url: `/coorporate/update/${id}`,
          method: "PUT",
          body: coorporate,
        }),
        invalidatesTags: ["coorporate",'security'],
      }),
  }),
});


export const {useCreateCoorporateMutation, useGetCoorporateQuery, useGetCoorporateByIdQuery, useUpdateCoorporateByIdMutation}=coorporateApi