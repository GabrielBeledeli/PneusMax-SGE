import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('PneusMax API')
    .setDescription('Documentacao da API do sistema PneusMax.')
    .setVersion('1.0')
    .addTag('Pneus')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'PneusMax API Docs',
  });

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
