import {Injectable} from '@nestjs/common';
import {BlockBrick} from '../bricks/block-brick/block-brick';
import {ContainerBrick} from '../bricks/container-brick/container-brick';
import {QuestionBrick} from '../bricks/question-brick/question-brick';

@Injectable()
export class Parser {
  private static readonly BRICK_MAP = {
    block: BlockBrick,
    container: ContainerBrick,
    question: QuestionBrick
  };

  parse(wall: any[], depth = 0, maxDepth = 5) {
    if (depth === maxDepth) {
      throw new Error(`Maximum depth (${maxDepth}) reached!`);
    }

    return wall.map((rawBrick => {
      if (!Parser.BRICK_MAP[rawBrick.kind]) {
        return rawBrick;
      }

      const brick = new Parser.BRICK_MAP[rawBrick.kind](rawBrick);

      if (brick.wall) {
        brick.wall = this.parse(brick.wall, depth + 1, maxDepth);
      }

      return brick;
    }));
  }
}