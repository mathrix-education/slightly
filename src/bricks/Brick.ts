export abstract class Brick {
  kind: string;
  uuid: string;

  constructor(data: Brick & {[key: string]: any}) {
    for (const [key, value] of Object.entries(data)) {
      this[key] = value;
    }
  }

  transform(): Brick {
    return this;
  }
}
