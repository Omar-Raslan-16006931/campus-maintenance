import { INestApplication, ValidationPipe } from '@nestjs/common';

/**
 * Cross-cutting HTTP configuration shared by main.ts and the e2e tests,
 * so tests exercise exactly the same validation rules as production.
 */
export function setupApp(app: INestApplication): void {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.enableCors({ origin: 'http://localhost:3000' });
}
