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
      