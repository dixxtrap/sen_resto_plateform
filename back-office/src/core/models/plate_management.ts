import { CompanyDto } from "./company.dto";
import { Plate } from "./plate";
import * as Yup from 'yup'
export class PlateManagement{
        monday?: boolean;
        tuesday?: boolean;
        wednesday?: boolean;
        thursday?: boolean;
        friday?: boolean;
        saturday?: boolean;
        sunday?: boolean;
        plateId?:number;
        plate?:Plate;
        company?:CompanyDto;
        companyId?:number;
        isActive?:number;
}

export const platManagementSchema=Yup.object({
        monday:Yup.boolean(),
        tuesday:Yup.boolean(),
        wednesday:Yup.boolean(),
        thursday:Yup.boolean(),
        friday:Yup.boolean(),
        sunday:Yup.boolean(),
        saturday:Yup.boolean(),
})