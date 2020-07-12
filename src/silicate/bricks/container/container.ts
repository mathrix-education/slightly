import {Brick} from '../../spec/brick';

export class Container extends Brick {
  public variant: string;
  public wall: any[];

  private static readonly VARIANT_NAMES = {
    definition: 'Définition',
    property: 'Propriété',
  };

  constructor(data) {
    super(data);
  }

  get variantName() {
    return Container.VARIANT_NAMES[this.variant] ?? `UNKNOWN VARIANT (${this.variant})`;
  }
}