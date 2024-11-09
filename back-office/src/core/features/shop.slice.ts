import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { ShopDto } from "../models/company.dto";
import { WsMessage } from "../models/error.dto";
import { BaseResponse } from "./base_response";
import { axiosBaseQuery } from "./axios_base_query";

export const shopApi = createApi({
  baseQuery: axiosBaseQuery({ baseUrl: "/v1" }),
  reducerPath: "shop",
  tagTypes: ["shop", "security"],
  endpoints: (builder) => ({
    getShop: builder.query<BaseResponse<ShopDto[]>, string>({
      query: () => ({ url: "/shop/all" }),
      providesTags: ["shop", "security"],
    }),
    createShop: builder.mutation<BaseResponse<ShopDto>, {restos: ShopDto; background?: File; file?: File}>({
      query: ({restos,background }) => ({
        url: "/shop/create",
        method: "POST",
        data: {...restos, background},
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
      invalidatesTags: ["shop"],
    }),
    updateShopById: builder.mutation<
      WsMessage,
      { id: number; restos: ShopDto; background?: File; file?: File }
    >({
      query: ({ id, restos, background, file }) => ({
        url: `/shop/update/${id}`,
        method: "PUT",
        data: { ...restos, background, file: file },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),

      invalidatesTags: ["shop"],
    }),
    getShopById: builder.query<BaseResponse<ShopDto>, number>({
      query: (id) => ({ url: `/shop/byId/${id}` }),
      providesTags: ["shop", "security"],
    }),
  }),
});


