import { User } from 'src/typeorm/user';
import { UserDto } from '../../dto/user.dto';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(user: UserDto): Promise<User>;
    getAllUser(): Promise<User[]>;
    getUserById(id: number): Promise<User>;
    updateUserById(id: number, user: UserDto): Promise<{
        message: string;
        code: number;
    }>;
}
