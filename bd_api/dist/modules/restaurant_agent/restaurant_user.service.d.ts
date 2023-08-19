import { Repository } from 'typeorm';
import { RestaurantUserDto } from 'src/dto/restaurant_user';
import { RestaurantUser } from 'src/typeorm';
export declare class RestaurantUserService {
    private repos;
    constructor(repos: Repository<RestaurantUser>);
    getS(): Promise<RestaurantUser[]>;
    get(id: number): Promise<RestaurantUser>;
    create(item: RestaurantUserDto): Promise<RestaurantUser>;
    update(id: number): Promise<{
        isActive: boolean;
        id: number;
        restaurantId: number;
        userId: number;
        restaurant: import("src/typeorm").Restaurant[];
        user: import("src/typeorm").User[];
        createdAt: Date;
        updatedAt: Date;
    }>;
}
