import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaClientExceptionFilter } from './exception/database.exception';
import cors from 'cors';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const { httpAdapter } = app.get(HttpAdapterHost);

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('/api');
  const whitelist = ['https://animaverso.com.br', 'http://animaverso.com.br'];
  app.enableCors({
    origin: function (origin, callback) {
      let corsOptions;
      if (whitelist.indexOf(origin) !== -1) {
        console.log('allowed cors for:', origin);
        corsOptions = { origin: true };
      } else {
        console.log('blocked cors for:', origin);
        corsOptions = { origin: false };
      }
      callback(null, corsOptions);
    },
    allowedHeaders:
      'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe',
    methods: 'GET,PUT,POST,DELETE,UPDATE,OPTIONS',
    credentials: true,
  });
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));
  await app.listen(3000);
}

bootstrap();
