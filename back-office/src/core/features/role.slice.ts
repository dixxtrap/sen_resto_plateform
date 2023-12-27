import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import { WsMessage } from "../models/error.dto";
import { PermissionDto, PermissionRole, RoleDto } from "../models/role.dto";

export const roleApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/v1" }),
  tagTypes: ["role"],
  reducerPath: "roleApi",
  endpoints: (builder) => ({
    getRoles: builder.query<RoleDto[], string>({
      query: () => `/role/all`,
      providesTags: ["role"],
    }),
     createRole: builder.mutation<
      WsMessage,
   RoleDto
    >({
      query: (body) => ({
        url: `/role/create`,
        method: "Post",
        body: body,
      }),
      invalidatesTags: ["role"],
    }),
    addPermissions: builder.mutation<
      WsMessage,
      { id: number; body: PermissionDto[] }
    >({
      query: ({ id, body }) => ({
        url: `/role/byId/addMultiplePermission/${id}`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["role"],
    }),
    removePermissions: builder.mutation<
      WsMessage,
      { id: number; body: PermissionRole[] }
    >({
      query: ({ id, body }) => ({
        url: `/role/byId/removeMultiplePermission/${id}`,
        method: "PUT",
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
    getRolePermissionById: builder.query<RoleDto, number>({
      query: (id) => `role/byId/permsission/${id}`,
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
  useGetRoleByIdQuery,
useGetRolePermissionByIdQuery,
useCreateRoleMutation
} = roleApi;
