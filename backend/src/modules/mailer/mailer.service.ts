import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { MailerService } from '@nestjs-modules/mailer';
import { basedire } from 'src/mysql.config';
import { join, resolve } from 'path';
import * as Mustache from 'mustache';
import { readFileSync } from 'fs';
import { ConfigService } from '@nestjs/config';
import { EntityProviderEnum } from 'src/typeorm/entity_provider_enum';
import { Inject } from '@nestjs/common/decorators/core/inject.decorator';
import { Repository } from 'typeorm';
import { Message } from 'src/typeorm/message.entity';
@Injectable()
export class EmailerService {
  constructor(
    private readonly mailerService: MailerService,
    @Inject(EntityProviderEnum.MESSAGE) private message: Repository<Message>,
    private config: ConfigService,
  ) {}
  async senOtp({ to, message }: { to: String; message: String }) {
    console.log(message);
    return `${to} ${message}`;
  }
  sendMessage({ to, message }: { to: String; message: String }) {
    return fetch(this.config.getOrThrow<string>('LAM_URL'), {
      method: 'POST',
      body: JSON.stringify({
        accountid: this.config.getOrThrow<string>('LAM_ACCESS_KEY'),
        password: this.config.getOrThrow<string>('LAM_ACCESS_PASSWORD'),
        sender: 'SenResto',
        to: to,
        text: message,
      }),
    });
  }
  async sendUserConfirmation({ user, token }: { user: any; token: string }) {
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
