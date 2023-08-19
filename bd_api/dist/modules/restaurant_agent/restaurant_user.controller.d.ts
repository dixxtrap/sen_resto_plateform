import { RestaurantUserService } from './restaurant_user.service';
import { RestaurantUserDto } from 'src/dto/restaurant_user';
export declare class RestaurantUserController {
    private service;
    constructor(service: RestaurantUserService);
    getS(): Promise<import("../../typeorm").RestaurantUser[]>;
    get(id: number): Promise<import("../../typeorm").RestaurantUser>;
    create(item: RestaurantUserDto): Promise<import("../../typeorm").RestaurantUser>;
    update(id: number): Promise<{
        isActive: boolean;
        id: number;
        restaurantId: number;
        userId: number;
        restaurant: import("../../typeorm").Restaurant[];
        user: import("../../typeorm").User[];
        createdAt: Date;
        updatedAt: Date;
    }>;
}
