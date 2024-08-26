import { FileDocument } from "./file_document.medel";
import { Tag } from "./tag.model";



export interface Plate{

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
  