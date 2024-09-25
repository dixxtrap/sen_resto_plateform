import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { CompanyDto } from '../models/company.dto';
import { WsMessage } from "../models/error.dto";
import { BaseResponse } from "./base_response";
import { axiosBaseQuery } from "./axios_base_query";
import { errorTrasform } from "./error_transformer";

export const companyApi = createApi({
  reducerPath: "companyApi",
  baseQuery: axiosBaseQuery({ baseUrl: "/v1" }),
  tagTypes: ["company",'security'],

  endpoints: (builder) => ({
    createCompany: builder.mutation<BaseResponse<CompanyDto>| WsMessage, {company:CompanyDto, file:File, background:File}>({
      query: ({file, background, company}) => ({
        url: "/company_restaurant/create",
        method: "POST",
        data: {...company, file, background},
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
      transformErrorResponse: errorTrasform,
      invalidatesTags: ["company"],
    }),
    getCompany:builder.query<BaseResponse<CompanyDto[]>,string>({
        query:()=>({url:"/company_restaurant/all"}),
        transformErrorResponse: errorTrasform,
        providesTags:["company",'security']
}),
getCompanyChildren:builder.query<BaseResponse<CompanyDto[]>,string>({
  query:()=>({url:"/partner/children"}),
  transformErrorResponse: errorTrasform,
  providesTags:["company",'security']
}),
getCompanyById: builder.query<BaseResponse<CompanyDto> ,string>({
        query: (id)=>({url:`/company_restaurant/byId/${id}`}),
        transformErrorResponse: errorTrasform,
        providesTags:["company",'security']
}),
updateCompanyById: builder.mutation<BaseResponse<CompanyDto>, { id: number, company: CompanyDto, file:File , background:File}>({
        query: ({id,company, file, background}) => ({
          url: `/company_restaurant/update/${id}`,
          method: "PUT",
          data: {...company, file, background},
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }),
        transformErrorResponse: errorTrasform,
        invalidatesTags: ["company"],
      }),
  }),
});


export const {useCreateCompanyMutation,useGetCompanyChildrenQuery, useGetCompanyQuery, useGetCompanyByIdQuery, useUpdateCompanyByIdMutation}=companyApi