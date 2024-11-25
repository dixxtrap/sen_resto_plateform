import { CompanyDto } from "./company.dto";
import { CreationDetailDto } from "./creation_details.dto";
import {  ProductDto } from "./product";
export class ProductManagementDto{
      id?:number;
        productId?:number;
        product?:ProductDto;
        partner?:CompanyDto;
        partnerId?:number;
        isActive?:boolean;
        details?:CreationDetailDto;
}
