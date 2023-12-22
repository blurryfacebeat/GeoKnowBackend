import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwaggerConfig } from './configs/open-api.config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupSwaggerConfig(app);

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  await app.listen(8080);
}
bootstrap();
