import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CompanyDto } from "../models/company.dto";
import { BaseResponse } from "../models/base_response";
import { CategoryDto } from "../models/category.dto";
import { errorTrasform } from "./error_transformer";
import { BannerDto } from "../models/banner.dto";
import { StoryGroup } from "../models/story.dto";


export const baseApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/v1" }),
  reducerPath: "baseApi",
  endpoints: (builder) => ({
    getCompany: builder.query<BaseResponse<CompanyDto[]>, string>({
      query: () =>
        `/ws/company/all`,
    }),
    getBanner: builder.query<BaseResponse<BannerDto[]>, string>({
      query: () =>
        `/ws/banner/all`,
    }),
    story: builder.query<BaseResponse<StoryGroup[]>, string>({
      query: () =>
        `/ws/story/all`,
    }),
    getCategory: builder.query<BaseResponse<CategoryDto[]>, string>({
      query: () =>
        `/ws/category/all`,
      transformErrorResponse:errorTrasform
    }),
    getCategoryBase: builder.query<BaseResponse<CategoryDto[]>, string>({
      query: () =>
        `/ws/category/base`,
      transformErrorResponse:errorTrasform
    }),
  }),
});
export const { useGetCompanyQuery, useGetCategoryQuery, useGetBannerQuery,useGetCategoryBaseQuery} = baseApi;
