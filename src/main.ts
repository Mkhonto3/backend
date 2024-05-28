import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });

  Logger.log('Enabling CORS...');
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  Logger.log('Setting up validation pipes...');
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  Logger.log('Listening on port 3001...');
  await app.listen(3005);

  Logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
