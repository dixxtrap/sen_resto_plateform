import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { PermissionDto, PermissionRoleDto, RoleDto } from "../models/role.dto";
import { WsMessage } from "../models/error.dto";

export const roleApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/v1" }),
  tagTypes: ["role"],
  endpoints: (builder) => ({
    getRoles: builder.query<RoleDto[], string>({
      query: () => `/role`,
      providesTags: ["role"],
    }),
    getPermission: builder.query<PermissionDto[], string>({
      query: () => `/permission`,
      providesTags: ["role"],
    }),
    updateRolePermission: builder.mutation<WsMessage, PermissionRoleDto>({
      query: (permissionRoles) => ({
        url: `/role/role_permission`,
        method: "POST",
        body: permissionRoles,
      }),
      invalidatesTags: ["role"],
    }),
    getRolePermissionAndUser: builder.query<RoleDto, number>({
      query: (id) => `role/permission/${id}`,
      providesTags: ["role"],
    }),
  }),
});

export const {
  useGetRolesQuery,
  useGetRolePermissionAndUserQuery,
  useGetPermissionQuery,
  useUpdateRolePermissionMutation,
} = roleApi;
