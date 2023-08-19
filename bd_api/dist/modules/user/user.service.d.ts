import { OnModuleInit } from '@nestjs/common';
import { User } from 'src/typeorm/user';
import { Repository } from 'typeorm';
import { SignInDto, UserDto } from '../../dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import { CompanyUser, RestaurantUser } from 'src/typeorm';
export declare class UserService implements OnModuleInit {
    private userRepos;
    private compUserRespo;
    private restoUserRespo;
    private jwt;
    constructor(userRepos: Repository<User>, compUserRespo: Repository<CompanyUser>, restoUserRespo: Repository<RestaurantUser>, jwt: JwtService);
    onModuleInit(): void;
    onInit(): Promise<User>;
    create(user: UserDto): Promise<User>;
    signIn(credential: SignInDto): Promise<string>;
    getAllUser(): Promise<User[]>;
    getUserById(id: number): Promise<User>;
    updateUserById(user: UserDto): Promise<{
        message: string;
        code: number;
    }>;
}
