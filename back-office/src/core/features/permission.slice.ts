import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { PermissionDto } from "../models/permission.dto";
import { WsMessage } from "../models/error.dto";

export const permissionApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/v1" }),
  reducerPath: "permissionApi",
  tagTypes: ["permissionApi", "role"],
  endpoints: (builder) => ({
    getPermission: builder.query<PermissionDto[], string>({
      query: () => "permission/all",
      providesTags:["permissionApi"]
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
    invalidatesTags: ["permissionApi","role"],
    providesTags:['permissionApi']
  }),
  }),
});

export const { useGetPermissionQuery, useCreatePermissionMutation } = permissionApi;
