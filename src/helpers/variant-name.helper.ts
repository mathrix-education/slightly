import * as hbs from 'hbs';

const map = {
  definition: 'Définition',
};

hbs.registerHelper('variant_name', (variant: string) => {
  return map[variant] ?? 'UNKNOWN';
});
