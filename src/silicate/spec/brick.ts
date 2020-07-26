export abstract class Brick {
  public readonly kind;

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  protected constructor(data: any) {
    Object.entries(data).forEach(([key, value]) => {
      this[key] = value;
    });
  }
}
