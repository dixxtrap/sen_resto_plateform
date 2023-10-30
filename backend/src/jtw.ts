import { JwtModule } from '@nestjs/jwt';

export const JWT = JwtModule.register({
  secret: process.env.API_KEY,
  signOptions: {
    expiresIn: '2d',
  },
});
