import * as hbs from 'hbs';

hbs.registerHelper('eq', (lhs, rhs, options) => {
  if (lhs == rhs) {
    return options.fn(this);
  }

  return options.inverse(this);
});