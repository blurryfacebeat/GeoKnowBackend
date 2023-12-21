import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwaggerConfig } from './configs/open-api.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupSwaggerConfig(app);

  app.setGlobalPrefix('api');
  await app.listen(8080);
}
bootstrap();
