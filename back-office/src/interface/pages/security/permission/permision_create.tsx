
import { CustomForm } from "../../../components/custom_form";
import { useForm } from "@mantine/form";
import { useCreatePermissionMutation } from "../../../../core/features/permission.slice";
import { useGetModuleQuery } from "../../../../core/features/module.slice";
import {   NativeSelect, TextInput } from "@mantine/core";
import { TextConstant } from "../../../../core/data/textConstant";


export const PermissionCreate = () => {
  const [create, { isSuccess, isLoading, isError } ]=useCreatePermissionMutation();
  const form=useForm({
  })
  const { data: module = [],
    // isLoading: isModuleLoading, isSuccess: isModuleLoadingSuccess
  } = useGetModuleQuery("")
  const _onSubmit=form.onSubmit((data)=>{
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
  
      <TextInput label={TextConstant.names} {...form.getInputProps("name")} error={form.errors["name"]} key={form.key("name")} />

        
        <NativeSelect   classNames={{input:'bgInput'}}   label="Module" data={module[0]?.children?.map(e => { return (e.children && e.children?.length > 0 ? { group: e.name!, items: e.children.map(m => ({ value: `${m.id}`, label: m.name! })) } : { label: e.name!, value: `${e.id}` }) })} />
          <NativeSelect id="" label={"Action"}  {...form.getInputProps("action")}
            data={[{ label: 'Tous', value: '*' },
              { label: 'Creation', value: 'CREATE' },
              { label: 'Lecture', value: 'READ' },
               { label: 'Modification', value: 'UPDATE' },
               {label:'SUppression', value:'DELETE'},
               {label:'Voir les details', value:'DETAILS'},
               ]}>
           
          </NativeSelect>
    
       
        <TextInput label={"Code"} {...form.getInputProps("code")} error={form.errors["code"]} key={form.key("code")} />
      </CustomForm>
    </div>
  );
};
