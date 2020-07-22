import {NsViewBridgeWeb} from './ns-view-bridge-web';

export class BridgeElement extends HTMLElement {
  protected get bridge(): NsViewBridgeWeb {
    return NsViewBridgeWeb.getInstance();
  }
}