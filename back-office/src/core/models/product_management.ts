import { CompanyDto } from "./company.dto";
import { CreationDetailDto } from "./creation_details.dto";
import {  ProductDto } from "./product";
import * as Yup from 'yup'
import { ProductManagementDayDto } from "./product_management_day";
export class ProductManagementDto{
      id?:number;
        productId?:number;
        product?:ProductDto;
        partner?:CompanyDto;
        partnerId?:number;
        isActive?:boolean;
        details?:CreationDetailDto;
        productManagementDay?:ProductManagementDayDto[]
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