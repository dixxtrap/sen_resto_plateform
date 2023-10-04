import React from "react";
import { useGetRolesQuery } from "../../../../core/features/role.slice";
import { TablePagination } from "../../../components/table_pagination";
import { Link } from "react-router-dom";
import { Status } from "../../../components/status";

export const RoleList = () => {
  const { data: roles = [] } = useGetRolesQuery("");
  return (
    <TablePagination
      isPaginated={false}
      title="Securité"
      subtitle="Gestion des roles & permission"
      createPath="/security/role/create"
      th={["Nom", "Scope", "Permissions","utilisateur", "Date de Creation", "Status", ""]}
      trs={
        <>
          {roles.map((e) => (
            <tr key={e.id + "_role"}>
              <td className=" whitespace-nowrap py-3 pl-4 pr-3 text-sm sm:pl-0">
                {e.name}
              </td>
              <td className="whitespace-nowrap  py-3 text-sm text-gray-500">
                {e.scope}
              </td>
              <td className="whitespace-nowrap  py-3 text-sm text-gray-500">
                {e.permissionLenght}
              </td>
              <td className="whitespace-nowrap  py-3 text-sm text-gray-500">
                {e.userLenght}
              </td>
              <td className="whitespace-nowrap  py-3 text-sm text-gray-500">
                {e.createdAt}
              </td>
              <td className="whitespace-nowrap  py-3 text-sm text-gray-500">
                <Status
                  status={e.isActive!}
                  activeText="Actif"
                  inactiveText="Inactif"
                />
              </td>
              <td className="relative whitespace-nowrap py-3 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
              <Link
                  to={`/security/role/permission/${e.id}`}
                  className="last_td">
                  Permission
                </Link>
                <Link
                  to={`/security/role/edit/${e.id}`}
                  className="last_td">
                  Modifier
                </Link>
                <Link
                  to={`/security/role/details/${e.id}`}
                  className="last_td">
                  Details
                </Link>
              </td>
            </tr>
          ))}
        </>
      }
    />
  );
};
