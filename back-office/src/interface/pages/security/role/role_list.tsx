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
      th={["Nom", "Scope", "Permissions", "Date de Creation", "Status", ""]}
      trs={
        <>
          {roles.map((e) => (
            <tr key={e.id + "_role"}>
              <td className=" ">
                {e.name}
              </td>
              <td className="">
                {e.scope}
              </td>
              <td className="">
                {e.permissionLenght}
              </td>

              <td className="">
                {e.createdAt}
              </td>
              <td className="">
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
