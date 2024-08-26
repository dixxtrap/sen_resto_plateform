import { CompanyDto } from "./company.dto";
import { CreationDetailDto } from "./creation_details.dto";
import {  ProductDto } from "./product";
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
