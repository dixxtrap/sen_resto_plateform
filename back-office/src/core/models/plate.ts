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
  monday?: boolean;
  tuesday?: boolean;
  wednesday?: boolean;
  thursday?: boolean;
  friday?: boolean;
  tagIds?: number[];
  saturday?: boolean;
  sunday?: boolean;
  cookingTime?: string;
  file?: PlateFile[];
  tag?: Tag[];
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
  monday:Yup.boolean(),
  tuesday:Yup.boolean(),
  wednesday:Yup.boolean(),
  thursday:Yup.boolean(),
  friday:Yup.boolean(),
  sunday:Yup.boolean(),
  saturday:Yup.boolean(),
});

export type PlateFormDataCreate = Yup.InferType<typeof plateSchema>;
