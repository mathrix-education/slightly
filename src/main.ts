import {NestFactory} from '@nestjs/core';
import {NestExpressApplication} from '@nestjs/platform-express';
import {readFileSync} from 'fs';
import {sync as glob} from 'glob';
import * as hbs from 'hbs';
import {
  join,
  parse,
} from 'path';
import {AppModule} from './app.module';

import './helpers/eq.helper';
import './helpers/katex.helper';
import './helpers/variant-name.helper';

declare const module: any;

function registerPartials() {
  glob(join(__dirname, 'views', 'partials', '*.hbs')).forEach((partial) => {
    hbs.registerPartial(parse(partial).name, readFileSync(partial).toString());
  });
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setViewEngine('hbs');

  app.useStaticAssets(join(__dirname, 'assets'));
  app.setBaseViewsDir(join(__dirname, 'views'));
  app.set('env development');

  registerPartials();

  app.use((req, res, next) => {
    registerPartials();
    next();
  });

  await app.listen(3000);

  // Webpack hot module reload
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(async () => {
      await app.close();
    });
  }
}

bootstrap();
