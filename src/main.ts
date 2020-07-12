import {NestFactory} from '@nestjs/core';
import {NestExpressApplication} from '@nestjs/platform-express';
import * as hbs from 'hbs';
import {join} from 'path';
import {AppModule} from './app.module';

import './helpers/eq.helper';
import './helpers/katex.helper';
import './helpers/variant-name.helper';

// import './assets/main.scss';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setViewEngine('hbs');

  app.useStaticAssets(join(__dirname, 'assets'));
  app.setBaseViewsDir(join(__dirname, 'views'));

  hbs.registerPartials(join(__dirname, 'views', 'partials'));

  await app.listen(3000);

  // Webpack hot module reload
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(async () => {
      await app.close();
      hbs.registerPartials(join(__dirname, 'views', 'partials'));
    });
  }
}

bootstrap();
