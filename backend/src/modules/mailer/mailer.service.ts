import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { MailerService } from '@nestjs-modules/mailer';
import { basedire } from 'src/mysql.config';
import { join, resolve } from 'path'; 
import * as Mustache from 'mustache';
import { readFileSync } from 'fs';
@Injectable()
export class EmailerService {
  
  constructor(private readonly mailerService: MailerService) { }
  async senOtp({ to, message }: { to: String, message: String }) {
    return `${to} ${message}`
  }
  
  async sendUserConfirmation({ user, token }: { user: any; token: string }) {
    const content = await Mustache.render(
      readFileSync(
        resolve(join( 'src/utils/mustache/activation.mail.mustache')),
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
