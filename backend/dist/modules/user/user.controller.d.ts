import { OnModuleInit } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from 'src/dto/user.dto';
export declare class UserController implements OnModuleInit {
    private readonly userService;
    constructor(userService: UserService);
    onModuleInit(): void;
    createAdmin(): Promise<void>;
    create(user: UserDto): Promise<import("../../typeorm").User>;
    getAllUser(): Promise<import("../../typeorm").User[]>;
    getUserById(id: number): Promise<import("../../typeorm").User>;
    updateUserById(id: number, user: UserDto): Promise<{
        message: string;
        code: number;
    }>;
}
