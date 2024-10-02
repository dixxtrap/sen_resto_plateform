import { ProductDto } from "./product";

export interface CompanyCategoryDto{
    id:number;
    name:string;
    isActive:boolean;
    product:ProductDto[]
}