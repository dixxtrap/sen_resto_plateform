import {
  
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/dist/query/react";
import { Tag } from "../models/tag.dto";

export const tagApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/v1" }),
  reducerPath: "tag",
  tagTypes: ["tag"],
  endpoints: (builder) => ({
    getTags: builder.query<Tag[], string>({
      query: () => "tag",
      providesTags: ["tag"],
    }),
  }),
});

export const { useGetTagsQuery } = tagApi;
