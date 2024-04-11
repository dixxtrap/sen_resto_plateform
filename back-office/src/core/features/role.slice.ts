import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import { WsMessage } from "../models/error.dto";
import { RoleDto } from "../models/role.dto";
import { PermissionDto } from "../models/permission.dto";
import { RolePermissionDto } from "../models/permission_role.dto";

export const roleApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/v1" }),
  tagTypes: ["role","security"],
  reducerPath: "roleApi",
  endpoints: (builder) => ({
    getRoles: builder.query<RoleDto, string>({
      query: () => `/role/all`,
      providesTags: ["role","security"],
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
      invalidatesTags: ["role","security"],
    }),
    addPermissions: builder.mutation<
      WsMessage,
      { id: number; body: PermissionDto[] }
    >({
      query: ({ id, body }) => ({
        url: `/role/by_id/add_multiple_permission/${id}`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["role","security"],
      // providesTags: ["role"],

    }),
    removePermissions: builder.mutation<
      WsMessage,
      { id: number; body: RolePermissionDto[] }
    >({
      query: ({ id, body }) => ({
        url: `/role/by_id/remove_multiple_permission/${id}`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["role"],
      // provi: ["role"],
    }),
    getNoValidPermission: builder.query<PermissionDto[], number>({
      query: (id) => `role/noValidPermission/${id}`,
      providesTags: ["role","security"],
    }),
    getRolePermissionAndUser: builder.query<RoleDto, number>({
      query: (id) => `role/permission/${id}`,
      providesTags: ["role","security"], 
    }),
    getRoleById: builder.query<RoleDto, number>({
      query: (id) => `role/permission_user/${id}`,
      providesTags: ["role","security"],
    }),
    getRolePermissionById: builder.query<RoleDto, number>({
      query: (id) => `role/by_id/permsission/${id}`,
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
