import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { axiosBaseQuery } from "./axios_base_query";
import { BaseResponse } from "./base_response";
import { GiftDto } from "../models/gift.dto";
import { errorTrasform } from "./error_transformer";
import { WsMessage } from "../models/error.dto";

export const giftApi = createApi({
    baseQuery: axiosBaseQuery({ baseUrl: "/v1" }),
    reducerPath: "gift",
    tagTypes: ["gift", "security"],
    endpoints: (builder) => ({
        getGift: builder.query<BaseResponse<GiftDto>, string>({
            query: () => ({ url: "/gift/all" }),
            providesTags: ["gift", "security"],
            transformErrorResponse: errorTrasform,
        }),
        createGift: builder.mutation<WsMessage, GiftDto>({
            query: (gift) => ({
              url: "/gift/create",
              method: "POST",
              data: gift,
            }),
            invalidatesTags: ["gift"],
            transformErrorResponse: errorTrasform,
          }),
    })
   
});

export const {
    useGetGiftQuery,
    useCreateGiftMutation
  } = giftApi;