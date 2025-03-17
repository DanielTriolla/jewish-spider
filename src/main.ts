import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });
  const PORT = process.env.PORT ?? 3000;
  app.setGlobalPrefix('api/v1');
  await app.listen(PORT, () =>
    console.log(`Server is running on http://localhost:${PORT}`),
  );
}
bootstrap();
