import {Injectable} from '@nestjs/common';
import {Container} from '../bricks/container/container';

@Injectable()
export class Parser {
  private static readonly BRICK_MAP = {
    container: Container,
  };

  parse(wall: any[], depth = 0, maxDepth = 5) {
    if (depth === maxDepth) {
      throw new Error(`Maximum depth (${maxDepth}) reached!`);
    }

    const wa = wall.map((rawBrick => {
      if (!Parser.BRICK_MAP[rawBrick.kind]) {
        return rawBrick;
      }

      const brick = new Parser.BRICK_MAP[rawBrick.kind](rawBrick);

      if (brick.wall) {
        brick.wall = this.parse(brick.wall, depth + 1, maxDepth);
      }

      return brick;
    }));

    if (depth === 0) {
      console.log(wa);
    }

    return wa;
  }
}