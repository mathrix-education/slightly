import {Brick} from '../../spec/brick';
import {Wall} from '../../spec/wall';
import {QuestionBrick} from '../question-brick/question-brick';

export class QuestionContainerBrick extends Brick {
  kind: 'question-container';
  statement: Wall;
  children: QuestionBrick[];
}