import * as hbs from 'hbs';

const globals = {
  base_href: process.env.BASE_HREF
};

hbs.registerHelper('globals', (key: string) => {
  return globals[key];
});