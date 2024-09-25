import { CompanyDto } from "./company.dto";

export interface EstablishmentTypeDto{
    imagePath?: string;
    name:string;
    description:string;
    isActive:boolean;
    id?:number
    company:CompanyDto[]
}