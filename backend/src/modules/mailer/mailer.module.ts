import { Module } from '@nestjs/common/decorators/modules/module.decorator';
// import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailerController } from './mailer.controller';
import { EmailerService } from './mailer.service';
import { ConfigService } from '@nestjs/config/dist/config.service';
import { ConfigModule } from '@nestjs/config/dist/config.module';
@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        console.log(configService.get<string>('SYSTEM_EMAIL_HOSTNAME'));
        console.log(configService.get<string>('SYSTEM_EMAIL_PORT'));
        console.log(configService.get<string>('SYSTEM_EMAIL_ADDRESS'));
        console.log(configService.get<string>('SYSTEM_EMAIL_ADDRESS'));
        return {
          transport: {
            host: configService.get<string>('SYSTEM_EMAIL_HOSTNAME'),
            port: configService.get<number>('SYSTEM_EMAIL_PORT'),
            auth: {
              user: configService.get<string>('SYSTEM_EMAIL_ADDRESS'),
              pass: configService.get<string>('SYSTEM_EMAIL_PASSWORD'),
            },
          },
          defaults: {
            from: `"No Reply"${configService.get<string>('SYSTEM_EMAIL_USERNAME')} <${configService.get<string>('SYSTEM_EMAIL_ADDRESS')}>`,
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [EmailerController],
  providers: [EmailerService],
  exports: [EmailerService],
})
export class EmailerModule {}
