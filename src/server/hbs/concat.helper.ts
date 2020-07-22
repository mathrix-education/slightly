import * as hbs from 'hbs';

hbs.registerHelper('concat', (...args) => args.slice(0, -1).join(''));