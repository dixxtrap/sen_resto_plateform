import { Link, useParams } from "react-router-dom";
import {
  useAddPermissionsMutation,
  useGetNoValidPermissionQuery,
  useGetRolePermissionAndUserQuery,
  useRemovePermissionsMutation,
} from "../../../../core/features/role.slice";
import { TablePagination } from "../../../components/table_pagination";
import { Status } from "../../../components/status";
import { formatDate } from "../../../utils/date_format";
import SquaresPlusIcon from "@heroicons/react/20/solid/esm/SquaresPlusIcon";
import { Square2StackIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import {
  PermissionDto,
  PermissionRole,
} from "../../../../core/models/role.dto";
import { CheckIcon } from "@heroicons/react/20/solid";

export const RolePermissionEdit = () => {
  const id = parseInt(useParams().id!);
  const [listPermission, setListPermission] = useState<PermissionDto[]>([]);
  const [listRemovePermission, setListRemovePermission] = useState<
    PermissionRole[]
  >([]);
  const [addPremission, { isLoading: isAddPermissionSuccess }] =
    useAddPermissionsMutation();
  const [
    removePermission,
    { isLoading: isRemoveLoading, isSuccess: isRemoveSuccess },
  ] = useRemovePermissionsMutation();

  const {
    data: role,
    isSuccess,
    isLoading,
    isError,
  } = useGetRolePermissionAndUserQuery(id);
  const {
    data: permissions = [],
    isSuccess: isPSuccess,
    isLoading: isPLoading,
    isError: isPError,
  } = useGetNoValidPermissionQuery(id);

  const handleListPermission = (body: PermissionDto) => {
    console.log(listPermission);
    console.log(body);
    console.log(listPermission.indexOf(body));
    if (listPermission.indexOf(body) === -1) {
      console.log("no content");
      setListPermission([...listPermission!, body]);
    } else {
      console.log("content");
      setListPermission([...listPermission.filter((e) => e.id !== body.id)]);
    }
  };
  const handleListRemovePermission = (body: PermissionRole) => {
    console.log(listRemovePermission);
    console.log(body);
    console.log(listRemovePermission.indexOf(body));
    if (listRemovePermission.indexOf(body) === -1) {
      console.log("no content");
      setListRemovePermission([...listRemovePermission!, body]);
    } else {
      console.log("content");
      setListRemovePermission([
        ...listRemovePermission.filter((e) => e.id !== body.id),
      ]);
    }
  };
  const addPremissionSubmit = () => {
    addPremission({ id, body: listPermission });
    setListPermission([]);
  };
  const removePremissionSubmit = () => {
    removePermission({ id, body: listRemovePermission });
    setListRemovePermission([]);
  };
  return (
    <div className="flex flex-col ">
      <TablePagination
        isPaginated={false}
        title="Liste des droits"
        subtitle={`privilèges accordés au ${role?.name}`}
        th={["Module", "Droit", "Creation", "Modification", "Status", ""]}
        trs={
          <>
            {role?.permission!.map((p) => (
              <tr key={`${p.id}_permission`} className="">
                <td>{p.sousModule}</td>
                <td>{p.type}</td>
                <td>{formatDate(p.createdAt!)}</td>
                <td>{formatDate(p.updatedAt!)}</td>

                <td>
                  <Status
                    activeText="active"
                    inactiveText="inactive"
                    status={p.isActive}
                  />
                </td>
                <td className="last_td_container">
                  {listRemovePermission?.findIndex((f) => p.id == f.id) ===
                  -1 ? (
                    <button
                      onClick={() => handleListRemovePermission(p)}
                      className="last_td flex ml-auto rounded-sm items-center h-5 w-5 ring-inset ring-2 ring-slate-500"
                    ></button>
                  ) : (
                    <button
                      onClick={() => handleListRemovePermission(p)}
                      className="  ml-auto bg-secondary-500   rounded-sm    flex"
                    >
                      <CheckIcon className="text-teal-50 h-5 p-0.5 w-5 m-auto" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </>
        }
      />
      {listRemovePermission.length > 0 && (
        <button
          onClick={() => removePremissionSubmit()}
          className="button primary ml-auto  "
        >
          Supprimer les permissions selectionner
        </button>
      )}
      <div className="h-10"></div>
      <TablePagination
        th={["Module", "Type", "Creation", "Modification", "Status", ""]}
        isPaginated={false}
        title="Permissions disponibles"
        subtitle={`liste des permissions non assignées au role ${role?.name}`}
        trs={
          <>
            {permissions.map((e) => (
              <tr>
                <td>{e.sousModule}</td>
                <td>{e.type}</td>
                <td>{formatDate(e.createdAt)}</td>
                <td>{formatDate(e.updatedAt)}</td>
                <td>
                  <Status
                    activeText="active"
                    inactiveText="inactive"
                    status={e.isActive}
                  />
                </td>
                <td className="last_td_container">
                  {listPermission?.findIndex((f) => e.id == f.id) === -1 ? (
                    <button
                      onClick={() => handleListPermission(e)}
                      className="last_td flex ml-auto rounded-sm items-center h-5 w-5 ring-inset ring-2 ring-slate-500"
                    ></button>
                  ) : (
                    <button
                      onClick={() => handleListPermission(e)}
                      className="  ml-auto bg-secondary-500   rounded-sm    flex"
                    >
                      <CheckIcon className="text-teal-50 h-5 p-0.5 w-5 m-auto" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </>
        }
      />
      {listPermission.length > 0 && (
        <button
          onClick={() => addPremissionSubmit()}
          className="button primary ml-auto  "
        >
          AJouter les permissions selectionner
        </button>
      )}
    </div>
  );
};
