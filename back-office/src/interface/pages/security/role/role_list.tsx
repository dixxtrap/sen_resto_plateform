import { useGetRolesQuery } from "../../../../core/features/role.slice";
import { Link } from "react-router-dom";
import { Title } from "../../../components/title";
import { RoleDto } from "../../../../core/models/role.dto";
import { clsx } from "../../../utils/clsx";
import { Button } from "@mantine/core";

export const RoleList = () => {
  const { data: roles  } = useGetRolesQuery("");
  const roleView=(role:RoleDto, isChild:boolean=false)=>{
    return <div className={clsx ( role.children?.length!>0?" " :"",isChild?"pl-10":"pl-3","  flex    borderl flex-col items-start grow   border-collapse  dark:border-kdark-divider  bodrer-gray-200/20   rounded-l-md  w-full")}>
    
      
     <div className="flex  justify-between    w-full items-stretch"> 
    {isChild&&  <div className="h-5 border-l-4  border-b-4 border-dashed rounded-bl-lg border-kdark-divider  text-end   w-9"></div>}
    <div className="grow flex  items-center  text-center ">
   
        <div className="text-base leading-10 ">{role.name?.replace("_", " ")}  <span className="text-gray-500">({role.code})</span></div>
       
     <div className="grow"></div>
      <div className=" flex gap-2 justify-between  ">
      <Button component={Link}  color="secondary"  to={`/security/role/permission/${role.id}`} className="">Permissions</Button>

      <Button component={Link}  color="secondary"  to={`/security/role/details/${role.id}`} className=" ">Details</Button>
      <Button component={Link} color="secondary"  to={`/security/role/create/${role.id}`} className="  ">Ajouter Sous Role</Button>
      </div>
    </div>
     </div>
      {role.children?.length!>0 && role.children?.map(item=>roleView(item, isChild=true))}
   
    </div>
  }
  return (
    < >
    <div className="flex justify-between items-center">
    <Title title={`Roles : ${roles?.name}`} subTitle="liste des roles et de leurs sous roles"/>

      <div className="flex gap-2">      <Button color="secondary" component={Link} to={`/security/role/permission/${roles?.id}`} className="">Permissions</Button>

<Button color="secondary" component={Link} to={`/security/role/details/${roles?.id}`} className="">Details</Button>
<Button color="secondary" component={Link} to={`/security/role/create/${roles?.id}`} className="">Ajouter  Sous Role</Button></div>
    </div>

     <div className="dark:bg-gray-500/5 bg-gray-100/5 ">
        {roles?.children?.map(item=>roleView(item))}
        </div>
     
    </>
  )
};
