import { Restaurant, User } from '.';
export declare class RestaurantUser {
    id: number;
    restaurantId: number;
    userId: number;
    isActive: boolean;
    restaurant: Restaurant[];
    user: User[];
    createdAt: Date;
    updatedAt: Date;
}
