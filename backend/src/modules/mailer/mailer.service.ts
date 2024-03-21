import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import * as Mustache from 'mustache';
import { MailerSend, EmailParams, Sender, Recipient } from 'mailersend';
import { resolve } from 'path';
@Injectable()
export class MailerService {
  async sendEmail({
    to,
    subject,
    text,
  }: {
    to: string;
    subject: string;
    text: string;
  }) {
    const mailerSend = new MailerSend({
      apiKey: process.env.MAILER_API_KEY,
    });
    const sentFrom = new Sender(
      'MS_nvY0ua@trial-z3m5jgrm2rd4dpyo.mlsender.net',
      "Sen Rest'o",
    );

    const recipients = [new Recipient(to)];

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setReplyTo(sentFrom)
      .setSubject(subject)
      .setHtml(text);

    try {
      const result = await mailerSend.email.send(emailParams);
      console.log('Email sent:', result);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
  async sendForgotPasswordMail({
    to,
    entityName,
    token,
  }: {
    to: string;
    entityName: string;
    token: string;
  }) {
    const content = await Mustache.render(
      readFileSync(
        resolve('/src/utils/mustache/forget_password.email.mustache'),
        'utf-8',
      ),
      {
        app_name: process.env.APP_NAME,
        org_name: entityName,
        action_url: `${process.env.APP_HOSTNAME}/v1/security/forgot-password?token=${token}`,
      },
    );

    return await this.sendEmail({
      to,
      subject: `Mot de passe oublié ${process.env.SYSTEM_EMAIL_USERNAME}`,
      text: content,
    });
  }
  async sendActivationMail({ to, token }: { to: string; token: string }) {
    const content = await Mustache.render(
      readFileSync(
        resolve('./src/utils/mustache/activation.mail.mustache'),
        'utf-8',
      ),
      {
        app_name: process.env.APP_NAME,
        org_name: process.env.APP_NAME,
        action_url: `${process.env.APP_HOSTNAME}/v1/security/activation?token=${token}`,
      },
    );

    return await this.sendEmail({
      to,
      subject: `Activation compte ${process.env.SYSTEM_EMAIL_USERNAME}`,
      text: content,
    });
  }
  async sendOtpByMailMail({
    to,
    
    message,
  }: {
    to: string;
    message: string;
  }) {
    const content = await Mustache.render(
      readFileSync(
        resolve('./src/utils/mustache/activation.reception_otp.email.mustache'),
        'utf-8',
      ),
      {
        app_name: process.env.APP_NAME,
        org_name: process.env.APP_NAME,
        message: message,
      },
    );

    return await this.sendEmail({
      to,
      subject: `Code de vérification ${process.env.SYSTEM_EMAIL_USERNAME}`,
      text: content,
    });
  }
}
