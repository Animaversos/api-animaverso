import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaClientExceptionFilter } from './exception/database.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { httpAdapter } = app.get(HttpAdapterHost);

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('/api');
  app.enableCors({
    origin: true,
    allowedHeaders: '*',
    methods: 'GET,PUT,POST,DELETE,UPDATE,OPTIONS',
    credentials: true,
  });
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));
  await app.listen(3000);
}

bootstrap();
