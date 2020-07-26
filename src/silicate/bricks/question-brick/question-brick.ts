import { Brick } from '../../spec/brick';
import { Wall } from '../../spec/wall';

export class QuestionBrick extends Brick {
  kind: 'question';
  statement: Wall;
  explanations: {
    points: number;
    content: Wall;
  }[];
}
