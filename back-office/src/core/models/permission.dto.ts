import * as Yup from "yup"
import { CreationDetailDto } from "./creation_details.dto";
import { ModuleDto } from "./module.dto";
export class PermissionDto {
        id?: number;
       action?:string;
       code?:string;
       module?:ModuleDto;
       moduleId?:number;
      
        name?: string;
        isActive?: boolean;
       
        details?:CreationDetailDto;
      }
      
      export const permissionSchema=Yup.object({
        name:  Yup.string().required("champ obligatoire"),
        action:  Yup.string().required("champ obligatoire"),
        code:  Yup.string().required("champ obligatoire"),
        moduleId:  Yup.number().required("champ obligatoire"),
      })
      