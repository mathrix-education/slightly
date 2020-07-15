import {Brick} from '../../spec/brick';

export class Container extends Brick {
  public variant: string;
  public wall: any[];

  private static readonly VARIANT_NAMES = {
    conclusion: 'Conclusion',
    corollary: 'Corollaire',
    definition: 'Définition',
    demonstration: 'Démontration',
    example: 'Exemple',
    introduction: 'Introduction',
    law: 'Loi',
    lemma: 'Lemme',
    problematic: 'Problématique',
    property: 'Propriété',
    proposition: 'Proposition',
    reciprocal: 'Réciproque',
    remark: 'Remarque',
    step: 'Étape',
    theorem: 'Théorème',
  };

  get variantName() {
    return Container.VARIANT_NAMES[this.variant] ?? `UNKNOWN VARIANT (${this.variant})`;
  }
}