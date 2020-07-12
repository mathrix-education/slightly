import * as hbs from 'hbs';

hbs.registerHelper('eq', function (a, b, options) {
  if (a == b) {
    return options.fn(this);
  }

  return options.inverse(this);
});