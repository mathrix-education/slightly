import * as hbs from 'hbs';
import * as katex from 'katex';

hbs.registerHelper('katex', (text: string, options) => {
  if (!text) {
    return text;
  }

  const result = text
    .split('$')
    .map((part: string, index: number) => {
      if (index % 2 === 0) {
        return part;
      } else {
        const math = part
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&amp;/g, '&');

        return katex.renderToString(math, {
          output: 'html',
          throwOnError: false,
        });
      }
    })
    .join('\n');

  return new hbs.handlebars.SafeString(result);
});

hbs.registerHelper('katexEq', (text: string) => {
  const result = katex.renderToString(text, {displayMode: true, output: 'html'});
  return new hbs.handlebars.SafeString(result);
});
