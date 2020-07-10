import {Wrapper} from '../Wrapper';
import {Brick} from './Brick';

export class ContainerBrick extends Brick {
  prefix?: string;
  title: string;
  suffix?: string;
  wall: Brick[];

  transform(): ContainerBrick {
    const firstLetter = this.title.charAt(0);
    this.title = `${this.prefix ? firstLetter.toUpperCase() : firstLetter.toLowerCase()}${this.title.slice(1)}`;

    this.wall = Wrapper.decorate(this.wall);
    return this;
  }
}
