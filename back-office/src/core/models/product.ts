import { CategoryDto } from "./category.dto";
import { CompanyDto } from "./company.dto";
import { CompanyCategoryDto } from "./company_category.dto";
import { CreationDetailDto } from "./creation_details.dto";

export interface ProductDto {
  id?: number;
  parentId?: number;
  parent?: CompanyDto;
  name?: string;
  description?: string;
  price?: number;
  reduction?: number;
details?:CreationDetailDto
 isActive:true;
 companyCategoryId?:number;
 companyCategory?:CompanyCategoryDto;
  cookingTime?: string;
  file?: ProductFile[];
  category?: CategoryDto[];
  categoryIds?: number[];

}

export interface ProductFile {
  id?: number;
 path?:string
}