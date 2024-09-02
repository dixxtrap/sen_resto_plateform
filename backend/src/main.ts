import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {  ValidationPipe, VersioningType } from '@nestjs/common';
import * as passport from 'passport';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
async function bootstrap() {
  // const httpsOptions = {
  //   key: readFileSync('../kpay-api.com_2024-01-09.key'),
  //   cert: readFileSync('../kpay-api.com_2024-01-09.crt'),
  // };
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableVersioning({ defaultVersion: '1', type: VersioningType.URI });
  const config = new DocumentBuilder()
    .setTitle('Restauration System && Card Management System')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);
  app.use(
    session({
      secret: 'B@kiH@man2023', // get from env file
      resave: true,
      saveUninitialized: true,
      cookie: {
        maxAge: 4 * 60 * 100000, 
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.useGlobalPipes(new ValidationPipe({transform:true }));
  await app.listen(3000);
}
bootstrap();
 