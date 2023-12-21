import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export const setupSwaggerConfig = (app: INestApplication<any>): void => {
  const config = new DocumentBuilder()
    .setTitle('GeoKnow')
    .setDescription('A free copy of the game https://www.geoguessr.com/')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);
};
