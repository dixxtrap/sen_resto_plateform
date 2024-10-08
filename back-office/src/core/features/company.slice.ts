import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { CompanyDto } from '../models/company.dto';
import { WsMessage } from "../models/error.dto";
import { BaseResponse } from "./base_response";
import { axiosBaseQuery } from "./axios_base_query";

export const companyApi = createApi({
  reducerPath: "companyApi",
  baseQuery: axiosBaseQuery({ baseUrl: "/v1" }),
  tagTypes: ["company",'security'],

  endpoints: (builder) => ({
    createCompany: builder.mutation<BaseResponse<CompanyDto>| WsMessage, CompanyDto>({
      query: (company: CompanyDto) => ({
        url: "/company_restaurant/create",
        method: "POST",
        data: company as CompanyDto,
      }),
      invalidatesTags: ["company"],
    }),
    getCompany:builder.query<BaseResponse<CompanyDto[]>,string>({
        query:()=>({url:"/company_restaurant/all"}),
        providesTags:["company",'security']
}),
getCompanyChildren:builder.query<BaseResponse<CompanyDto[]>,string>({
  query:()=>({url:"/partner/children"}),
  providesTags:["company",'security']
}),
getCompanyById: builder.query<BaseResponse<CompanyDto> ,string>({
        query: (id)=>({url:`/company_restaurant/byId/${id}`}),
        providesTags:["company",'security']
}),
updateCompanyById: builder.mutation<BaseResponse<CompanyDto>, { id: number, company: CompanyDto, file:File }>({
        query: ({id,company, file}) => ({
          url: `/company_restaurant/update/${id}`,
          method: "PUT",
          data: {...company, file},
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }),
        
        invalidatesTags: ["company"],
      }),
  }),
});


export const {useCreateCompanyMutation,useGetCompanyChildrenQuery, useGetCompanyQuery, useGetCompanyByIdQuery, useUpdateCompanyByIdMutation}=companyApi