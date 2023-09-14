import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/loginDto';
import { Request } from 'express';

@Injectable()
export class SecurityService {
  constructor(private user: UserService) {}
  async login(body: LoginDto) {
    console.log(body);
    return await this.user.signIn(body);
  }
  async profile(req: Request) {
    const user = await this.user.getUserById(req['user'].id);
    console.log('----------get user by id-----------------');
    console.log(user);
    return user;
  }
}
