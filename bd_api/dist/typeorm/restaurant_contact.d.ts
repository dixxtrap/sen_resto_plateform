import { Restaurant } from './';
import { Contact } from './contact';
export declare class RestaurantContact extends Contact {
    restaurantId: number;
    restaurant: Restaurant;
    createdAt: Date;
    updatedAt: Date;
}
