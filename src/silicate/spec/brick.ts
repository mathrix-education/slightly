export abstract class Brick {
  public readonly kind;

  protected constructor(data: any) {
    Object.entries(data).forEach(([key, value]) => {
      this[key] = value;
    });
  }
}
