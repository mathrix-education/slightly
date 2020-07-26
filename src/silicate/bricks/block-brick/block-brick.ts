import { Brick } from '../../spec/brick';

export class BlockBrick extends Brick {
  public variant: string;

  get img(): string {
    switch (this.variant) {
      case 'trap':
        return 'lumix-question.svg';
      case 'tip':
        return 'lumix-smile.svg';
      case 'reminder':
        return 'lumix-question.svg';
    }
  }
}
