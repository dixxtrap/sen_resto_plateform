import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Plate } from "../models/plate";
import { IPagination, IPaginationResult } from "../models/pagination.model";
import { Tag } from "../models/tag.dto";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/v1" }),
  reducerPath: "api",
  endpoints: (builder) => ({
    getPlates: builder.query<IPaginationResult<Plate>, IPagination>({
      query: (filter) =>
        `web/plate?page=${filter.page}&pageSize=${filter.pageSize}&search=${filter.search}&fromDate=${filter.fromDate}' `,
    }),
    getTags: builder.query<[Tag], string>({
        query: () =>
          `tag`,
      }),
  }),
});
export const { useGetPlatesQuery, useGetTagsQuery } = api;
