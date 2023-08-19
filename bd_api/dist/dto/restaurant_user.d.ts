import { RestaurantDto } from './restaurant.dto';
import { UserDto } from './user.dto';
export declare class RestaurantUserDto {
    companyId: number;
    userId: number;
}
export declare class RestaurantUserDtoUpdate extends RestaurantUserDto {
    id: number;
    isActive: boolean;
}
export declare class RestaurantUserDtoGet extends RestaurantUserDto {
    isActive: boolean;
    company: RestaurantDto;
    User: UserDto;
}
