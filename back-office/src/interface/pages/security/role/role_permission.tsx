import { Link, useParams } from "react-router-dom";
import {
  useAddPermissionsMutation,
  useGetNoValidPermissionQuery,
  useGetRolePermissionAndUserQuery,
  useGetRolePermissionByIdQuery,
  useRemovePermissionsMutation,
} from "../../../../core/features/role.slice";
import { TablePagination } from "../../../components/table_pagination";
import { Status } from "../../../components/status";
import { formatDate } from "../../../utils/date_format";
import { useState } from "react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { PermissionDto } from "../../../../core/models/permission.dto";
import { RolePermissionDto } from "../../../../core/models/permission_role.dto";
import { Title } from "../../../components/title";
import { Alert, DialogAlert } from "../../../components/alert_success";
import { useGetPermissionQuery } from "../../../../core/features/permission.slice";

export const RolePermissionEdit = () => {
  const { data: permissions = [] } = useGetPermissionQuery("");
  const [showDialog, setShowDialog] = useState(false);
  const id = parseInt(useParams().id!);
  const [listPermission, setListPermission] = useState<PermissionDto[]>([]);
  const [listRemovePermission, setListRemovePermission] = useState<
    RolePermissionDto[]
  >([]);
  const [addPremission, { isLoading: isAddLoading , isError:isAddError}] =
    useAddPermissionsMutation();
  const [removePermission,{isLoading:isRemoveLoading, isError:isRemoveError}] = useRemovePermissionsMutation();

  const {
    data: role,
    isSuccess,
    isLoading,
    isError,
  } = useGetRolePermissionByIdQuery(id);

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
  const handleListRemovePermission = (body: RolePermissionDto) => {
   
    if (!listRemovePermission.some(e=>e.permissionId===body.permissionId)) {
      console.log("no content");
      setListRemovePermission([...listRemovePermission!, body]);
    } else {
      console.log("content");
      setListRemovePermission([
        ...listRemovePermission.filter((e) => e.permissionId !== body.permissionId),
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
  const AddPermission = (
    <DialogAlert isOpen={showDialog} onClose={() => setShowDialog(false)}>
      <div className="h-[75vh] relative flex flex-col">
        <div className="sticky top-0 w-full">
          <div>
            <Title title="Liste des permission" />
          </div>
        </div>
        <div className="grow  w-full overflow-y-auto flex flex-col   ">
          {permissions
            .filter(
              (p) => !role?.rolePermission?.some((rp) => rp.permissionId == p.id)
            )
            .map((item) => (
              <button key={`role_permission_${item.id}`} onClick={()=>handleListPermission(item)} className=" flex justify-between hover:bg-gray-500/30 p-2 border-b border-gray-500/40">
               <div className="flex flex-col">
               <div className="flex ">
                  <span className="font-semibold">Nom : </span>{" "}
                  <span className="mx-2">{item.name}</span>
                </div>
                <div className="flex ">
                  <span className="font-semibold">code : </span>{" "}
                  <span className="lowercase text-gray-500 mx-2"> {item.code}</span>
                </div>
               </div>
               <div className="ring-2 ring-gray-500/60 rounded-md h-5 w-5 ">
                {listPermission.some(p=>p.id===item.id)&&  <CheckIcon className="text-teal-50 h-5 p-0.5 w-5 m-auto bg-secondary-500 rounded-md" />}
               </div>
              </button>
            ))}
            <div className="sticky bottom-0 bg-white pt-2  dark:bg-black  ">
              <button className="button primary" onClick={addPremissionSubmit}>Valider</button>
            </div>
        </div>
      </div>
    </DialogAlert>
  );
  return (
    <>
    <Alert isOpen={isRemoveLoading} type="loading"/>
    <Alert isOpen={isAddLoading} type="loading"  />
    <div className="flex flex-col ">
      <div className="flex justify-between items-end ">
        {AddPermission}
        <Title
          title="Liste des droits"
          subTitle={`privilèges accordés au ${role?.name}`}
        />
        <button className="button primary " onClick={() => setShowDialog(true)}>
          {" "}
          Ajouter des permission
        </button>
      </div>
      <TablePagination
        isPaginated={false}
        th={[
          "Label",
          "Scope",
          "Droit",
          "Creation",
          "Modification",
          "Status",
          "",
        ]}
        trs={
          <>
            {role?.rolePermission!.map((p) => (
              <tr key={`${p.permissionId}_permission`} className="">
                <td>{p.permission?.name}</td>
                <td className="lowercase">{p.permission?.code}</td>
                <td>{p.permission?.action}</td>
                <td>{formatDate(p.permission?.details?.updatedAt!)}</td>
                <td>{formatDate(p.permission?.details?.createdAt!)}</td>

                <td>
                  <Status
                    activeText="active"
                    inactiveText="inactive"
                    status={p.canInherit!}
                  />
                </td>
                <td className="last_td_container">
                 
                    <button
                      onClick={() => handleListRemovePermission(p)}
                      className="  ring-2 ring-gray-500/60 rounded-md h-5 w-5"
                    >
                    
                {listRemovePermission.some(item=>p.permissionId===item.permissionId)&&  <CheckIcon className="text-teal-50 h-5 p-0.5 w-5 m-auto bg-secondary-500 rounded-md" />}
              
                    </button>
                 
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
      {/* <TablePagination
        th={["label", "Scope","Type", "Creation", "Modification", "Status", ""]}
        isPaginated={false}
        title="Permissions disponibles"
        subtitle={`liste des permissions non assignées au role ${role?.name}`}
        trs={
          <>
            {permissions.map((e) => (
              <tr>
                <td>{e.label}</td>
                <td className="lowercase">{e.code}</td>
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
      /> */}
      {/* {listPermission.length > 0 && (
        <button
          onClick={() => addPremissionSubmit()}
          className="button primary ml-auto  "
        >
          AJouter les permissions selectionner
        </button>
      )} */}
    </div>
    </>
  );
};
