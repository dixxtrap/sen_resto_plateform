import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { PermissionDto } from "../models/permission.dto";
import { WsMessage } from "../models/error.dto";

export const permissionApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/v1" }),
  reducerPath: "permission",
  tagTypes: ["permission",'security'],
  endpoints: (builder) => ({
    getPermission: builder.query<PermissionDto[], string>({
      query: () => "permission/all",
      providesTags: ["permission",'security'],
    }),
    createPermission: builder.mutation<
    WsMessage,
    PermissionDto 
  >({
    query: (body) => ({
      url: `/permission/create`,
      method: "POST",
      body: body,
    }),
    invalidatesTags: ["permission",'security'],
    // providesTags:['permissionApi']
  }),
  }),
});

export const { useGetPermissionQuery, useCreatePermissionMutation } = permissionApi;
