import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CompanyDto } from "../models/company.dto";
import { BaseResponse } from "../models/base_response";
import { CategoryDto } from "../models/category.dto";
import { errorTrasform } from "./error_transformer";
import { BannerDto } from "../models/banner.dto";
import { StoryGroup } from "../models/story.dto";
import { PaymentType } from "../models/payment_type";
import { City } from '../models/city.dto';
import { EstablishmentTypeDto } from "../models/establishment_type.dto";


export const baseApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/v1" }),
  reducerPath: "baseApi",
  endpoints: (builder) => ({
    getCompany: builder.query<BaseResponse<CompanyDto[]>, void>({
      query: () =>
        `/ws/company/all`,
    }),
    city: builder.query<BaseResponse<City[]>, void>({
      query: () =>
        `/city/all?perPage=1000&page=1`,
    }),
    getEts: builder.query<BaseResponse<EstablishmentTypeDto[]>, void>({
      query: () =>
        `/establishment_type/all`,
    }),
    getEtsCompany: builder.query<BaseResponse<EstablishmentTypeDto[]>, string>({
      query: () =>
        `/ws/company/establishment_type/all`,
    }),
    getEtsCompanyById: builder.query<BaseResponse<EstablishmentTypeDto>, string>({
      query: (id) =>
        `/ws/company/establishment_type/by_id/${id}`,
    }),
    getCompanyDetails: builder.query<BaseResponse<CompanyDto>, string>({
      query: (id) =>
        `/ws/company/details/${id}`,
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
    paymentType: builder.query<BaseResponse<PaymentType[]>, string>({
      query: () =>
        `/ws/payment_type/all`,
      transformErrorResponse:errorTrasform
    }),
    getCategoryBase: builder.query<BaseResponse<CategoryDto[]>, string>({
      query: () =>
        `/ws/category/base`,
      transformErrorResponse:errorTrasform
    }),
    getRegion:builder.query<BaseResponse<[City]>,"">({
      query:()=>({url:`city/region`})
      ,
      transformErrorResponse: errorTrasform,
     
  }),
  getChildren:builder.query<BaseResponse<[City]>,string>({
      query:(id)=>({url:`city/children/${id}`})
      ,
      transformErrorResponse: errorTrasform,
     
  }),
  }),
});
export const { useGetCompanyQuery, useGetCategoryQuery, useGetBannerQuery,useGetCategoryBaseQuery} = baseApi;
