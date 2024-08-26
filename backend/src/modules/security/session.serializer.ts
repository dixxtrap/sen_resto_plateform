import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UserDto } from 'src/typeorm/user.entity';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor() {
    super();
  }
  serializeUser(user: UserDto, done: (err: Error|null, user: any) => void) {
    // console.log('---------------------serializator---------------');
    done(null, user);
  }
  deserializeUser(payload: any, done: (err: Error, payload: string) => void) {
    // console.log('---------------------deserializator---------------');

    done(null, payload);
  }
}
