import { FileDocument } from "./file_document";
import * as Yup from "yup";
import { Tag } from "./tag.dto";  

export interface Plate {
  id?: number;
  restaurantId?: number;
  name?: string;
  description?: string;
  price?: number;
  reduction?: number;
  updatedAt?: string; 
  createdAt?: string;
 
  cookingTime?: string;
  file?: PlateFile[];
  tag?: Tag[];
  tagIds?: number[];

}

export interface PlateFile {
  id: number;
  plateId: number;
  photoId: number;
  photo: FileDocument;
}

export const plateSchema = Yup.object({
  id:Yup.number(),
  restaurantId: Yup.number(),
  name: Yup.string(),
  cookingTime: Yup.string().label("00:00"),
  description: Yup.string(),
  price: Yup.number(),
  reduction: Yup.number(),
  tag: Yup.array(),
  tagIds: Yup.array(),
 
});


export type PlateFormDataCreate = Yup.InferType<typeof plateSchema>;
