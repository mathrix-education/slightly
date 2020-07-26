import { Brick } from '../../spec/brick';

export class ContainerBrick extends Brick {
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
  public variant: string;
  public wall: any[];

  get variantName(): string {
    return ContainerBrick.VARIANT_NAMES[this.variant] ?? `UNKNOWN VARIANT (${this.variant})`;
  }
}
