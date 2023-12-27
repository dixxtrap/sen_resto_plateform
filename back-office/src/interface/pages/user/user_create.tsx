import { useEffect } from "react";
import { CustomForm } from '../../components/custom_form';
import { useForm } from 'react-hook-form';
import { User, userSchema } from '../../../core/models/user.dto';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '../../components/input';
import { useGetCompanyChildrenQuery, useGetCompanyQuery } from '../../../core/features/company.slice';
import { useGetResttaurantQuery } from '../../../core/features/restaurant.slice';
import { clsx } from '../../utils/clsx';
import { useGetRolesQuery } from '../../../core/features/role.slice';
import { useCreateUserMutation } from '../../../core/features/auth.slice';
import { RoleDto } from "../../../core/models/role.dto";

export const UserCreate = () => {
  const {data:roles=[]}=useGetRolesQuery("");
  const {data:companies=[]}=useGetCompanyChildrenQuery("");


  const [createUser, { isSuccess, isError, isLoading, reset }] = useCreateUserMutation();
  const { register,watch, formState:{errors},setValue, handleSubmit}=useForm(
    {
      resolver:yupResolver(userSchema)
    }
  );
  const _onsubmit=(user:User|undefined)=>{
    console.log(user);
    createUser({...user!, pin:"000000"});
  }
  useEffect(() => {
    if (companies.length>0) {
      setValue("companyId" , companies[0].id)
   }
    }, [companies])

    const showRole=(role:RoleDto)=>{
      return role.children?.length!>0?<optgroup  label={role.name}>
        <option value={role.id}>{role.name}</option>
      {role.children?.map((role2)=><option value={role2.id}>{role2.name}</option>)}
                 </optgroup>:<option value={role.id}>{role.name}</option>
    }
  return (
    <div>
    <CustomForm onFinish={()=>reset()}  isSuccess={isSuccess} isError={isError} isLoading={isLoading} title='Agent' subTitle='Creer un nouveau Utilisateur'  onSubmit={handleSubmit(_onsubmit)} >
     <Input label='Prenom' name='firstname' error={errors.firstname?.message}>
        <input  id='firstname' className='input' {...register("firstname")}/>
      </Input>
      <Input label='Nom' name='lastname' >
        <input  id='lastname' className='input' {...register("lastname")}/>
      </Input>
      
      <Input label='Adresse Mail' name='email' >
        <input id='email'  className='input'{...register("email")} />
        </Input>
        <Input label='Téléphone' name='phone'  >
        <input  id='phone' className='input' {...register("phone")}/>
      </Input>
      <Input label='Adrresse' name='address'  >
        <input  id='address' className='input' {...register("address")}/>
      </Input>
      <Input label='Region' name='city'  >
        <input  id='city' className='input' {...register("city")}/>
      </Input>
      <Input label='Pays' name='country'  >
        <input  id='country' className='input' {...register("country")}/>
      </Input>
     <Input label='Organisation'>
     <select className={clsx( "input",
                 "h-9",)} {...register("companyId")}>
        {
          companies.map(e=><option className='input' value={e.id}>{e.name}</option>)
        }
      </select></Input>
    
      <Input label='Role'>
      <select className={clsx( "input",
                 "lowercase",
                  "h-9",)} {...register("roleId")}>
        {
          roles[0]?.children?.map(e=>showRole(e))
        }
      </select></Input>
    </CustomForm>
    </div>
  )
}
