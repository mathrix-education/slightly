import {NsViewBridgeWeb} from './ns-view-bridge-web';

export abstract class App {
  protected bridge: NsViewBridgeWeb = NsViewBridgeWeb.getInstance();

  protected constructor(
    protected readonly $state = document.querySelector<HTMLDivElement>('#app'),
  ) {
  }

  /**
   * Short for this.$state.querySelector.
   * @param selectors The CSS selector.
   */
  protected $<T extends Element = Element>(selectors: string): T {
    return this.$state.querySelector<T>(selectors);
  }

  /**
   * Bind the required elements to their event handlers.
   */
  protected abstract bind(): void;
}