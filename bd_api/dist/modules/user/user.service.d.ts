import { User } from 'src/typeorm/user';
import { Repository } from 'typeorm';
import { SignInDto, UserDto } from '../../dto/user.dto';
import { JwtService } from '@nestjs/jwt';
export declare class UserService {
    private userRepos;
    private jwt;
    constructor(userRepos: Repository<User>, jwt: JwtService);
    create(user: UserDto): Promise<User>;
    signIn(credential: SignInDto): Promise<string>;
    getAllUser(): Promise<User[]>;
    getUserById(id: number): Promise<User>;
    updateUserById(user: UserDto): Promise<{
        message: string;
        code: number;
    }>;
}
