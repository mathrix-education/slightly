/**
 * Polyfill for debugging window.nsWebViewBridge.
 * @link https://market.nativescript.org/plugins/@nota%2Fnativescript-webview-ext
 */
export class NsViewBridgeWeb {
  private static readonly instance = new NsViewBridgeWeb();

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
  }

  public off(eventName: string, cb: (data: any) => void): void {
    console.log(`Un-registered event handler on "${eventName}"`);
  }

  public emit<T>(eventName: string, data: T): void {
    console.log(`Emitted "${eventName}" with data`, data);
  }
}