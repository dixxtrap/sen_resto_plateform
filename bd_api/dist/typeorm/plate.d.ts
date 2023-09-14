import { PlateFile, Restaurant } from '.';
import { Tag } from './tag';
export declare class Plate {
    id: number;
    restaurant: Restaurant;
    restaurantId: number;
    name: string;
    file: PlateFile;
    description: string;
    tag: Tag[];
    price: number;
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
    cookingTime: number;
    reduction: number;
    updatedAt: Date;
    createdAt: Date;
}
