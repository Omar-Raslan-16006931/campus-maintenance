import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { setupApp } from './setup-app';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupApp(app);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Campus Maintenance API')
    .setDescription(
      'Report, browse, filter and resolve campus maintenance requests',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  const config = app.get(ConfigService);
  const port = config.get<number>('PORT') ?? 3001;
  await app.listen(port);
}
void bootstrap();
