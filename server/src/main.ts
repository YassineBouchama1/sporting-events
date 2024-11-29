import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  
  app.use(cookieParser());



  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );





  // config cors
  app.enableCors({
    origin: configService.get('cors.origins'),
    methods: configService.get('cors.methods'),
    credentials: configService.get('cors.credentials'),
    allowedHeaders: configService.get('cors.allowedHeaders'),
  });

  const config = new DocumentBuilder()
    .setTitle('Event  API')
    .setDescription('Event platform API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(configService.get('cors.origins') || 4000);
}
bootstrap();
