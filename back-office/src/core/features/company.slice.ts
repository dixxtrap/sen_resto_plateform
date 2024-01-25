import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { CompanyDto } from "../models/company.dto";
import { WsMessage } from "../models/error.dto";

export const companyApi = createApi({
  reducerPath: "companyApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/v1" }),
  tagTypes: ["company"],

  endpoints: (builder) => ({
    createCompany: builder.mutation<CompanyDto| WsMessage, CompanyDto>({
      query: (company: CompanyDto) => ({
        url: "/company_restaurant/create",
        method: "POST",
        body: company,
      }),
      invalidatesTags: ["company"],
    }),
    getCompany:builder.query<CompanyDto[],string>({
        query:()=>"/company_restaurant/all",
        providesTags:["company"]
}),
getCompanyChildren:builder.query<CompanyDto[],string>({
  query:()=>"/partner/children",
  providesTags:["company"]
}),
getCompanyById: builder.query<Partial<CompanyDto> ,string>({
        query: (id)=>`/company_restaurant/byId/${id}`,
        providesTags:["company"]
}),
updateCompanyById: builder.mutation<CompanyDto, { id: number, company: CompanyDto }>({
        query: ({id,company}) => ({
          url: `/company_restaurant/update/${id}`,
          method: "PUT",
          body: company,
        }),
        invalidatesTags: ["company"],
      }),
  }),
});


export const {useCreateCompanyMutation,useGetCompanyChildrenQuery, useGetCompanyQuery, useGetCompanyByIdQuery, useUpdateCompanyByIdMutation}=companyApi