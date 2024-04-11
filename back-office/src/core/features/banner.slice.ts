import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { BaseResponse } from "./base_response";
import { BannerDto } from "../models/banner.dto";
import { axiosBaseQuery } from "./axios_base_query";
import { WsMessage } from "../models/error.dto";
import { errorTrasform } from "./error_transformer";

export const bannerApi = createApi({
  baseQuery: axiosBaseQuery({ baseUrl: "/v1" }),
  reducerPath: "banner",
  tagTypes: ["banner", "security"],
  endpoints: (builder) => ({
    createBanner: builder.mutation<WsMessage, { file: File; body: BannerDto }>({
      query: ({ file, body }) => ({
        url: "/banner/create",
        data: { file: file, ...body },
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),

      invalidatesTags: ["banner"],
    }),
    deleteBanner: builder.mutation<WsMessage, string>({
      query: (id) => ({ url: `/banner/delete/${id}`, method: "DELETE" }),
      invalidatesTags: ["banner"],
    }),
    updateBanner: builder.mutation<
      WsMessage,
      { file: File; body: BannerDto; id: string }
    >({
      query: ({ file, body, id }) => ({
        url: `/banner/update/${id}`,
        data: { file: file, ...body },
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),

      invalidatesTags: ["banner"],
    }),
    getBanner: builder.query<BaseResponse<BannerDto[]>, string>({
      query: () => ({
        url: "/banner/all",
      }),
      providesTags: ["banner", "security"],
    }),
    getBannerById: builder.query<BaseResponse<BannerDto>, string>({
      query: (id) => ({
        url: `/banner/by_id/${id}`,
      }),
      providesTags: ["banner", "security"],
    }),
  }),
});
export const {useGetBannerQuery,useDeleteBannerMutation,useGetBannerByIdQuery, useCreateBannerMutation, useUpdateBannerMutation}=bannerApi;