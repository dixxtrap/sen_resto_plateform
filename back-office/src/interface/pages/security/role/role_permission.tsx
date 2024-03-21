import {  useParams } from "react-router-dom";
import {
  useAddPermissionsMutation,
 
  useGetRolePermissionByIdQuery,
  useRemovePermissionsMutation,
} from "../../../../core/features/role.slice";
import { TablePagination } from "../../../components/table_pagination";
import { Status } from "../../../components/status";
import { formatDate } from "../../../utils/date_format";
import {  useState } from "react";
import { CheckBadgeIcon, CheckIcon } from "@heroicons/react/20/solid";
import { PermissionDto } from "../../../../core/models/permission.dto";
import { RolePermissionDto } from "../../../../core/models/permission_role.dto";
import { Title } from "../../../components/title";
import { Alert, DialogAlert } from "../../../components/alert_success";
import { useGetPermissionQuery } from "../../../../core/features/permission.slice";
import { clsx } from "../../../utils/clsx";

export const RolePermissionEdit = () => {
  const { data: permissions = [],isLoading:isLoadingPermission } = useGetPermissionQuery("");
  const [showDialog, setShowDialog] = useState(false);
  const id = parseInt(useParams().id!);
  const [listPermission, setListPermission] = useState<PermissionDto[]>([]);
  const [listRemovePermission, setListRemovePermission] = useState<
    RolePermissionDto[]
  >([]);
  const [addPermission, { isLoading: isAddLoading , }] =
    useAddPermissionsMutation();
  const [removePermission,{isLoading:isRemoveLoading, }] = useRemovePermissionsMutation();

  const {
    data: role,
 
  } = useGetRolePermissionByIdQuery(id);

  const handleListPermission = (body: PermissionDto) => {
    console.log(listPermission);
    console.log(body);
    console.log(listPermission.indexOf(body));
    if (!listPermission.some(item=>item.id===body.id)) { 
      setListPermission([...listPermission!, body]);
    } else {
      setListPermission([...listPermission.filter((e) => e.id !== body.id)]);
    }
  };
  const handleListRemovePermission = (body: RolePermissionDto) => {
    if (!listRemovePermission.some(e=>e.permissionId===body.permissionId)) {
      setListRemovePermission([...listRemovePermission!, body]);
    } else {
      setListRemovePermission([
        ...listRemovePermission.filter((e) => e.permissionId !== body.permissionId),
      ]);
    }
  };
  const addPremissionSubmit = () => {
    const listP2=listPermission;
    setListPermission([]);
    setShowDialog(false);
    console.log(listP2)
     addPermission({ id, body: listPermission })
  



  };


  const removePremissionSubmit = () => {
    removePermission({ id, body: listRemovePermission });
    setListRemovePermission([])
  };
 const showDialogWidget= (!isLoadingPermission&& <DialogAlert isOpen={showDialog} onClose={() => setShowDialog(false)}>
 <div className="h-[75vh] relative flex flex-col">
   <div className="sticky top-0 w-full">
     <div>
       <Title title="Liste des permission" />
     </div>
   </div>
   <div className="fgrow h-fit  w-full overflow-y-auto flex flex-wrap gap-2  textSubtileValue">
   <div className={clsx(" flex flex-wrap gap-2   ")}>
     {permissions
       .map((item) => (
         role?.rolePermission?.some((rp) => rp.permissionId === item.id)?null:
         <button key={`role_permission_add_${item.id}`} onClick={()=>handleListPermission(item)} className={clsx(" flex justify-between rounded-sm  ring-inset ring-gray-200 ring-1   p-2 ", listPermission.some(p=>p.id===item.id)?'bg-secondary-400/30 ':'')}>
          
             <span className="font-normal">{item.name}</span>
          
          
             
         
          
           {listPermission.some(p=>p.id===item.id)&&  <CheckBadgeIcon  className="text-secondary-500 h-5  w-5 m-auto  rounded-md ml-2" />}
         
         </button>
       ))}
       <div className="sticky bottom-0 bg-white  pt-0.5 dark:bg-black  ">
       
        
       </div>
    
   </div>
  <div className="grow"></div>
     </div>
     {listPermission.length > 0 && (<button className="button primary " onClick={() =>{ addPremissionSubmit()}}>
   
   Ajouter les permission
 </button>
)}
 </div>
</DialogAlert>)
  return (
    <div>
     
    {isRemoveLoading&&<Alert isOpen={true} type="loading"/>}
    {isAddLoading&&<Alert isOpen={ true} type="loading"/>}
    {showDialogWidget}
  
   
    <div className="flex flex-col ">
      <div className="flex justify-between items-end ">
     
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
                      className="  ring-2 ring-gray-500/60 ring-inset rounded-md h-5 w-5"
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
    </div>
  );
};
