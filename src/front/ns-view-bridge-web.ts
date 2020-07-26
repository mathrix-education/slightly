/**
 * Polyfill for debugging window.nsWebViewBridge.
 * @link https://market.nativescript.org/plugins/@nota%2Fnativescript-webview-ext
 */
export class NsViewBridgeWeb {
  private static readonly instance = new NsViewBridgeWeb();
  private readonly emitQueue: {name: string, event: any}[] = [];
  private readonly onQueue: {name: string, handler: (data: any) => void}[] = [];

  constructor() {
    window.addEventListener('ns-bridge-ready', () => {
      this.emitQueue.forEach(({name, event}) => NsViewBridgeWeb.getInstance().emit(name, event));
      this.onQueue.forEach(({name, handler}) => NsViewBridgeWeb.getInstance().on(name, handler));
    });
  }

  public static getInstance(): NsViewBridgeWeb {
    const windowRef = (window as unknown as Window & {nsWebViewBridge: NsViewBridgeWeb});

    if (!windowRef.nsWebViewBridge) {
      return NsViewBridgeWeb.instance;
    } else {
      return windowRef.nsWebViewBridge;
    }
  }

  public on<T>(eventName: string, cb: (data: T) => void): void {
    console.log(`Registered event handler on "${eventName}"`);

    this.onQueue.push({
      name: eventName,
      handler: cb,
    });
  }

  public off<T>(eventName: string, cb: (data: T) => void): void {
    console.log(`Un-registered event handler on "${eventName}"`);
  }

  public emit<T>(eventName: string, data: T): void {
    console.log(`Emitted "${eventName}" with data`, data);

    this.emitQueue.push({
      name: eventName,
      event: data,
    });
  }
}