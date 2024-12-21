import { Module } from '@nestjs/common/decorators/modules/module.decorator';
// import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { EmailerController } from './mailer.controller';
import { EmailerService } from './mailer.service';
import { basedire } from 'src/mysql.config';
import { ConfigService } from '@nestjs/config/dist/config.service';
import { ConfigModule } from '@nestjs/config/dist/config.module';
@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('SYSTEM_EMAIL_ADDRESS'),
          port: configService.get<number>('SYSTEM_EMAIL_PORT'),
          auth: {
            user: configService.get<string>('SYSTEM_EMAIL_ADDRESS'),
            pass: configService.get<string>('SYSTEM_EMAIL_PASSWORD'),
          },
        },
        defaults: {
          from: `"No Reply"<${configService.get<string>('SYSTEM_EMAIL_USERNAME')}>`,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [EmailerController],
  providers: [EmailerService],
  exports: [EmailerService],
})
export class EmailerModule {}
