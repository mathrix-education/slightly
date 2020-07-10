import {BRICK_MAP} from './BrickMap';
import {Brick} from './bricks/Brick';

export class Wrapper {
  static decorate(wall: Brick[]): Brick[] {
    return wall.map(b => Wrapper.instanciate(b));
  }

  static instanciate(brick: Brick): Brick {
    return new BRICK_MAP[brick.kind](brick);
  }
}
