import {NsViewBridgeWeb} from './ns-view-bridge-web';

export class BridgeElement extends HTMLElement {
  protected get bridge(): NsViewBridgeWeb {
    return NsViewBridgeWeb.getInstance();
  }

  /**
   * Alias to {@see Element.querySelector}.
   */
  protected $<T extends Element = Element>(selectors: string): T {
    return this.querySelector<T>(selectors);
  }

  /**
   * Alias to {@see Element.querySelectorAll} passed into {@see Array.from}.
   */
  protected $$<T extends Element = Element>(selectors: string): T[] {
    return Array.from<T>(this.querySelectorAll<T>(selectors));
  }
}