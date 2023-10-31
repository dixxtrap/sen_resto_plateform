import { UserService } from '../user/user.service';
import { LoginDto } from './dto/loginDto';
import { Request } from 'express';
export declare class SecurityService {
    private user;
    constructor(user: UserService);
    login(body: LoginDto): Promise<string>;
    profile(req: Request): Promise<import("../../typeorm").User>;
}
