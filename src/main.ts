import {NestFactory} from '@nestjs/core';
import {NestExpressApplication} from '@nestjs/platform-express';
import * as hbs from 'hbs';
import {join} from 'path';
import {AppModule} from './app.module';
import {katexHelper} from './helpers/katex.helpers';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setViewEngine('hbs');

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));

  hbs.registerPartials(join(__dirname, '..', 'views', 'partials'));
  hbs.registerHelper('katex', katexHelper);

  await app.listen(3000);
}

bootstrap();
