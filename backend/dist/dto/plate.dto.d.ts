import { RestaurantDto } from './restaurant.dto';
import { TagDto } from './tag.dto';
export declare class PlateDto {
    id: number;
    restaurantId: number;
    name: string;
    description: string;
    cookingTime: number;
    price: number;
    reduction: number;
    tag: [TagDto];
    tagIds: [number];
    updatedAt: Date;
    createdAt: Date;
}
export declare class GetPalteDto extends PlateDto {
    resaturant: RestaurantDto;
}
