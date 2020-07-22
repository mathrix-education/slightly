export const Element = (selector: string) => (constructor: CustomElementConstructor) => {
  if (!window.customElements.get(selector)) {
    window.customElements.define(selector, constructor);
  }
};