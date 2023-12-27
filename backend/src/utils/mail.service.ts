import * as nodemailer from 'nodemailer';
import * as Mustache from 'mustache';
import { readFileSync } from 'fs';
import { resolve } from 'path';
export class EmailService {
  //   private static transporter = nodemailer.createTransport({
  //     host: process.env.SYSTEM_EMAIL_HOSTNAME,
  //     port: process.env.SYSTEM_EMAIL_PORT,
  //     secure: false, // true for 465, false for other ports
  //     auth: {
  //       user: process.env.SYSTEM_EMAIL_ADDRESS,
  //       pass: process.env.SYSTEM_EMAIL_PASSWORD,
  //     },
  //   });

  static async sendEmail({
    to,
    subject,
    text,
    html,
  }: {
    to: string;
    subject?: string;
    text?: string;
    html?: unknown;
  }) {
    const transporter = nodemailer.createTransport({
      host: process.env.SYSTEM_EMAIL_HOSTNAME,
      port: process.env.SYSTEM_EMAIL_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SYSTEM_EMAIL_ADDRESS,
        pass: process.env.SYSTEM_EMAIL_PASSWORD,
      },
    });
    const mailOptions = {
      from: `"${process.env.SYSTEM_EMAIL_USERNAME}" <${process.env.SYSTEM_EMAIL_ADDRESS}>`,
      to,
      subject,
      text,
      html,
    };

    await transporter.sendMail(mailOptions);
    return 'true';
  }
  static async sendSmS({ msg, to }: { msg: string; to: string }) {
    const raw = JSON.stringify({
      mobileNumber: to,
      fromName: 'KPay Test',
      text: msg,
      secret: 'pk2ssmz01ra7n981kubrig',
      isCritical: true,
    });

    const requestOptions = {
      body: raw,
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    };
    const result = await fetch(
      'https://gateway-test.zuulu.net/sms/send',
      requestOptions,
    );

    if (result.ok) console.log(`message envoyé a ${to} `);
    else console.log(`message non  envoyé a ${to} `);
    return result.json();
  }
  static async sendActivationMail({
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
        resolve('./src/utils/mustache/activation.mail.mustache'),
        'utf-8',
      ),
      {
        app_name: process.env.APP_NAME,
        org_name: entityName,
        action_url: `${process.env.APP_HOSTNAME}/v1/security/activation?token=${token}`,
      },
    );

    return await this.sendEmail({
      to,
      subject: `Activation compte ${process.env.SYSTEM_EMAIL_USERNAME}`,
      html: content,
    });
  }
  static async sendForgotPasswordMail({
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
        resolve('./src/utils/mustache/forget_password.email.mustache'),
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
      html: content,
    });
  }

  static async sendOtpByMailMail({
    to,
    entityName,
    message,
  }: {
    to: string;
    entityName: string;
    message: string;
  }) {
    const content = await Mustache.render(
      readFileSync(
        resolve('./src/utils/mustache/activation.reception_otp.email.mustache'),
        'utf-8',
      ),
      {
        app_name: process.env.APP_NAME,
        org_name: entityName,
        message: message,
      },
    );

    return await this.sendEmail({
      to,
      subject: `Code de vérification ${process.env.SYSTEM_EMAIL_USERNAME}`,
      html: content,
    });
  }
}
