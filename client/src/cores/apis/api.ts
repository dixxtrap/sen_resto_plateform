import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CompanyDto } from "../models/company.dto";
import { BaseResponse } from "../models/base_response";
import { CategoryDto } from "../models/category.dto";
import { errorTrasform } from "./error_transformer";


export const baseApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/v1" }),
  reducerPath: "baseApi",
  endpoints: (builder) => ({
    getCompany: builder.query<BaseResponse<CompanyDto[]>, string>({
      query: () =>
        `/ws/company/all`,
    }),
    getCategory: builder.query<BaseResponse<CategoryDto[]>, string>({
      query: () =>
        `/ws/category/all`,
      transformErrorResponse:errorTrasform
    }),
   
  }),
});
export const { useGetCompanyQuery, useGetCategoryQuery} = baseApi;
