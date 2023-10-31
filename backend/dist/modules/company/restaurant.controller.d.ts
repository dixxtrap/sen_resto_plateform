import { RestaurantDto } from 'src/dto/restaurant.dto';
import { CompanyService } from './company.service';
import { Request } from 'express';
export declare class RestaurantController {
    private readonly companyService;
    constructor(companyService: CompanyService);
    createRestaurant(restaurant: RestaurantDto, req: Request): Promise<import("../../typeorm").Restaurant>;
    getRestaurants(): Promise<import("../../typeorm").Restaurant[]>;
    getRestaurantsParticulier(): Promise<import("../../typeorm").Restaurant[]>;
    get(id: number): Promise<import("../../typeorm").Restaurant>;
    updtaeRestaurant(id: number, restaurant: RestaurantDto): Promise<{
        message: string;
    }>;
}