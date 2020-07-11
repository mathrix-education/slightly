import * as katex from 'katex';
import * as Handlebars from 'handlebars'

export function katexHelper(text: string, displayMode: boolean = false) {
  let result;

  // if (displayMode) {
  //   result = katex.renderToString(text, {
  //     displayMode,
  //   });
  // } else {
    result = text.split('$').map((part: string, index: number) => {
      if (index % 2 === 0) {
        return part;
      } else {
        return katex.renderToString(part);
      }
    });
  // }

  return new Handlebars.SafeString(result);
}