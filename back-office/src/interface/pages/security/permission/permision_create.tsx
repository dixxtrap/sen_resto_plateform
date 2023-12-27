import React from "react";
import { CustomForm } from "../../../components/custom_form";
import { Input } from "../../../components/input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { permissionSchema } from "../../../../core/models/permission.dto";
import { useCreatePermissionMutation } from "../../../../core/features/permission.slice";
import { useGetModuleQuery } from "../../../../core/features/module.slice";


export const PermissionCreate = () => {
  const [create, { isSuccess, isLoading, isError } ]=useCreatePermissionMutation();
  const {register, handleSubmit, formState:{errors,}, watch}=useForm({
    resolver:yupResolver(permissionSchema)
  })
  const {data:module=[], isLoading:isModuleLoading, isSuccess:isModuleLoadingSuccess}=useGetModuleQuery("")
  const _onSubmit=handleSubmit((data)=>{
console.log(data);
create({...data});
  })
  return (
    <div>
      <CustomForm
        onSubmit={_onSubmit}
        title="Creer une nouvelle permission"
        isError={isError}
        isLoading={isLoading}
        isSuccess={isSuccess}
      >
        <Input label="Nom de la Permission" error={errors.name?.message}>
          <input className="input" {...register("name")} />
        </Input>
        <Input label="Module"  error={errors.moduleId?.message}>
          <select id="" className="input h-10" {...register("moduleId")}>
            <option value="*"></option>
           {module[0]?.children?.map(item=> item.children?.length!>0?<optgroup  label={item.name}>
{item.children?.map(item2=><option value={item2.id}>{item2.name}</option>)}
           </optgroup>:<option value={item.id}>{item.name}</option> )}
            
          </select>
        </Input>
        <Input label="Action"  error={errors.action?.message}>
          <select id="" className="input h-10" {...register("action")}>
            <option value="*"></option>
            <option value="CREATE">Création</option>
            <option value="READ">Lecture</option>
            <option value="UPDATE">Modification</option> 
            <option value="DELETE">Suprression</option>
            <option value="DETAILS">Avoir les Details</option>
          </select>
        </Input>
        <Input label="Code de la Permission " error={errors.name?.message}>
          <input className="input" {...register("code")}  />
        </Input>
      </CustomForm>
    </div>
  );
};
