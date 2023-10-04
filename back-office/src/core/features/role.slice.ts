import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { PermissionDto, PermissionRole, RoleDto } from "../models/role.dto";
import { WsMessage } from "../models/error.dto";

export const roleApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/v1" }),
  tagTypes: ["role"],
  reducerPath: "roleApi",
  endpoints: (builder) => ({
    getRoles: builder.query<RoleDto[], string>({
      query: () => `/role`,
      providesTags: ["role"],
    }),

    addPermissions: builder.mutation<
      WsMessage,
      { id: number; body: PermissionDto[] }
    >({
      query: ({ id, body }) => ({
        url: `/role/permissions/${id}`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["role"],
    }),
    removePermissions: builder.mutation<
      WsMessage,
      { id: number; body: PermissionRole[] }
    >({
      query: ({ id, body }) => ({
        url: `/role/deletePermissions/${id}`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["role"],
    }),
    getNoValidPermission: builder.query<PermissionDto[], number>({
      query: (id) => `role/noValidPermission/${id}`,
      providesTags: ["role"],
    }),
    getRolePermissionAndUser: builder.query<RoleDto, number>({
      query: (id) => `role/permission/${id}`,
      providesTags: ["role"],
    }),
    getRoleById: builder.query<RoleDto, number>({
      query: (id) => `role/permission_user/${id}`,
      providesTags: ["role"],
    }),
  }),
});

export const {
  useGetRolesQuery,
  useGetRolePermissionAndUserQuery,
  useAddPermissionsMutation,
  useRemovePermissionsMutation,
  useGetNoValidPermissionQuery,
  useGetRoleByIdQuery
} = roleApi;
