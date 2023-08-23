import { FileDocument } from "./file_document";
import * as Yup from "yup";
import { Tag } from "./tag.dto";

export interface Plate {
  id: number;
  restaurantId: number;
  name: string;
  description: string;
  price: number;
  reduction: number;
  updatedAt: string;
  createdAt: string;
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
  file: PlateFile[];
  tag: Tag[];
}

export interface PlateFile {
  id: number;
  plateId: number;
  photoId: number;
  photo: FileDocument;
}

export const plateSchema = Yup.object().shape({
  restaurantId: Yup.string(),
  name: Yup.string(),
  description: Yup.string(),
  price: Yup.number(),
  reduction: Yup.number(),
  tag: Yup.array(Yup.number()),
});

export type PlateFormDataCreate = Yup.InferType<typeof plateSchema>;
