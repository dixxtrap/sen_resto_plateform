import {  useParams } from "react-router-dom";
import {
  useGetRolePermissionByIdQuery,
  useUpdateRoleMutation,
  
} from "../../../../core/features/role.slice";
import { Status } from "../../../components/status";
import { formatDate } from "../../../utils/date_format";
import {  useEffect } from "react";

import { Title } from "../../../components/title";
import { useGetPermissionQuery } from "../../../../core/features/permission.slice";

import ThemeProvider from "../../../../core/providers/theme.provider";
import {  Modal, MultiSelect, Space } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { CustomForm } from "../../../components/custom_form";
import { TablePagination } from "../../../components/table/table";

export const RolePermissionEdit = () => {
  const form = useForm<{permissions:string[]}>({
    initialValues: {
    permissions:[]
  }})
  const { data: permissions = [],isLoading:isLoadingPermission } = useGetPermissionQuery("");
  const [showDialog, {open, close}] = useDisclosure(false);
  const id = parseInt(useParams().id!);

  const [addPermission, addPerssionsState] =
    useUpdateRoleMutation();
  const role = useGetRolePermissionByIdQuery(id);


  const _onsubmit = form.onSubmit(data => {
    console.log(data)
    addPermission({ id: id, body: data })
})
 
useEffect(() => {
  form.setValues({permissions:role?.data?.rolePermission?.map(p=>`${p.permissionId!}`)})
}, [role.isSuccess])


 const showDialogWidget= (!isLoadingPermission&& <Modal title="Ajouter de nouveaux Permissions" opened={showDialog} onClose={ close}>
   <ThemeProvider>
     <CustomForm  onSubmit={_onsubmit} {...addPerssionsState} >
       
       <MultiSelect  hidePickedOptions {...form.getInputProps('permissions')} dropdownOpened height={100} comboboxProps={{position: 'bottom-start'}}  maxDropdownHeight={250}  styles={{input:{height:250, overflow:'auto'}}} searchable data={permissions.map(e => ({ label: e.name!, value: `${e.id}` }))} w={'100%'} />
       <Space  h={{base:260}} ></Space>


     </CustomForm>
  
 </ThemeProvider>
</Modal>)
  return (
    <div>
    {showDialogWidget}
  
   
    <div className="flex flex-col ">
      <div className="flex justify-between items-end ">
     
        <Title
          title="Liste des droits"
          subTitle={`privilèges accordés au ${role?.data?.name}`}
        />
       
        <button className="button primary " onClick={open}>
          {" "}
          Ajouter des permission
        </button>
      </div>
      
      <TablePagination
      {...role}
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
            {role?.data?.rolePermission!.map((p) => (
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
                 
                 
                </td>
              </tr>
            ))}
          </>
        }
      />
     
      <div className="h-10"></div>
     
    </div>
    </div>
  );
};
