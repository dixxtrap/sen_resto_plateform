import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {  ProductDto } from "../models/product";
import { IPagination } from "../models/pagination.model";
import { CompanyDto } from "../models/company.dto";
import { BaseResponse } from "../models/base_response";


export const baseApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/v1" }),
  reducerPath: "baseApi",
  endpoints: (builder) => ({
    getCompany: builder.query<BaseResponse<CompanyDto[]>, string>({
      query: () =>
        `ws/company/all`,
    }),
   
  }),
});
export const { useGetCompanyQuery} = baseApi;
