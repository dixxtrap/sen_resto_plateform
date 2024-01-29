import * as Yup from "yup";
import { CategoryDto } from "./category.dto";
import { CompanyDto } from "./company.dto";
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
 
  cookingTime?: string;
  file?: ProductFile[];
  category?: CategoryDto[];


}

export interface ProductFile {
  id?: number;
 path?:string
}

export const productSchema = Yup.object({
  id:Yup.number(),
  restaurantId: Yup.number(),
  name: Yup.string(),
  cookingTime: Yup.string().label("00:00"),
  description: Yup.string(),
  price: Yup.number(),
  reduction: Yup.number(),

 
});


export type PlateFormDataCreate = Yup.InferType<typeof productSchema>;
