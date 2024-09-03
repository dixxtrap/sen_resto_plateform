import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserDto } from 'src/typeorm/user.entity';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserDto => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    // Return user as a UserDto
    return new UserDto(user);
  },
);