import React from "react";
import { useGetRolesQuery } from "../../../../core/features/role.slice";
import { TablePagination } from "../../../components/table_pagination";
import { Link } from "react-router-dom";
import { Status } from "../../../components/status";
import { formatDate } from "../../../utils/date_format";
import { Title } from "../../../components/title";
import { RoleDto } from "../../../../core/models/role.dto";
import { clsx } from "../../../utils/clsx";

export const RoleList = () => {
  const { data: roles = [] } = useGetRolesQuery("");
  const roleView=(role:RoleDto, isChild:boolean=false)=>{
    return <div className={clsx ( role.children?.length!>0?" " :""," pl-5 flex    borderl flex-col items-start grow   border-collapse  dark:border-kdark-divider  bodrer-gray-200/20   rounded-l-md  w-full")}>
    
      
     <div className="flex  justify-between  gap-2  w-full items-stretch"> 
    {isChild&&  <div className="h-10 border-l-4  border-b-4 border-dashed rounded-bl-lg border-kdark-divider  text-end   w-16  "></div>}
    <div className="grow flex  items-center py-2 pr-3 text-center ">
   
        <div className="text-base leading-10 pt-2">{role.name?.replace("_", " ")}  <span className="text-gray-500">({role.code})</span></div>
       
     <div className="grow"></div>
      <div className=" flex gap-x-2">
      <Link to={`/security/role/permission/${role.id}`} className="inline-flex justify-center text-xs font-semibold text-center rounded-full  px-5 py-1 min-w-[80px]  my-1 ring-2 ring-inset text-teal-50 bg-teal-500 dark:bg-teal-800/90 ring-teal-100/60">Permissions</Link>

      <Link to={`/security/role/details/${role.id}`} className="inline-flex justify-center text-xs font-semibold text-center rounded-full  px-5 py-1 min-w-[80px]  my-1 ring-2 ring-inset text-teal-50 bg-teal-500 dark:bg-teal-800/90 ring-teal-100/60">details</Link>
      <Link to={`/security/role/create/${role.id}`} className="inline-flex justify-center text-xs font-semibold text-center rounded-full  px-5 py-1 min-w-[80px]  my-1 ring-2 ring-inset text-teal-50 bg-teal-500 dark:bg-teal-800/90 ring-teal-100/60"> + role</Link>
      </div>
    </div>
     </div>
      {role.children?.length!>0 && role.children?.map(item=>roleView(item, isChild=true))}
   
    </div>
  }
  return (
    < >
      <Title title="Liste des role" subTitle="liste des role et de leurs sous role"/>
     <div className="dark:bg-gray-500/5 bg-gray-100/5 ">
        {roles.map(item=>roleView(item))}
        </div>
     
    </>
  )
};
