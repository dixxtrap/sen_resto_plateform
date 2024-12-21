import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { MailerService } from '@nestjs-modules/mailer';
import { join, resolve } from 'path';
import * as Mustache from 'mustache';
import { readFileSync } from 'fs';
import { ConfigService } from '@nestjs/config';
import { EntityProviderEnum } from 'src/typeorm/entity_provider_enum';
import { Inject } from '@nestjs/common/decorators/core/inject.decorator';
import { Repository } from 'typeorm';
import { Message } from 'src/typeorm/message.entity';
import { Env } from 'src/env';
@Injectable()
export class EmailerService {
  constructor(
    private readonly mailerService: MailerService,
    @Inject(EntityProviderEnum.MESSAGE) private message: Repository<Message>,
    private config: ConfigService,
  ) {}
  async senOtp({ to, message }: { to: string; message: string }) {
    console.log(message);
    return `${to} ${message}`;
  }
  sendMessage({ to, message }: { to: string; message: string }) {
    if (process.env.ENV !== Env.LOCAL)
      return fetch(this.config.getOrThrow<string>('LAM_URL'), {
        method: 'POST',
        body: JSON.stringify({
          accountid: this.config.getOrThrow<string>('LAM_ACCESS_KEY'),
          password: this.config.getOrThrow<string>('LAM_ACCESS_PASSWORD'),
          sender: this.config.getOrThrow<string>('LAM_SENDER_NAME'),
          to: to,
          text: message,
        }),
      });
    return this.senOtp({ to, message });
  }
  async sendUserConfirmation({ user, token }: { user: any; token: string }) {
    console.log(this.config.get<string>('SYSTEM_EMAIL_HOSTNAME'));
    console.log(this.config.get<string>('SYSTEM_EMAIL_PORT'));
    console.log(this.config.get<string>('SYSTEM_EMAIL_ADDRESS'));
    console.log(this.config.get<string>('SYSTEM_EMAIL_PASSWORD'));
    const content = await Mustache.render(
      readFileSync(
        resolve(join('src/utils/mustache/activation.mail.mustache')),
        'utf-8',
      ),
      {
        app_name: process.env.APP_NAME,
        org_name: process.env.APP_NAME,
        action_url: `${process.env.APP_HOSTNAME}/v1/security/activation?token=${token}`,
      },
    );
    return await this.mailerService
      .sendMail({
        to: user.email,
        subject: 'Welcome to My App! Confirm your Email',
        html: content,
      })
      .then((val) => {
        console.log(val);
        return;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
