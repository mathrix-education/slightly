import {
  Body,
  Controller,
  Post,
  Render,
} from '@nestjs/common';
import {Brick} from './bricks/Brick';
import {Wrapper} from './Wrapper';

@Controller()
export class AppController {
  @Post()
  @Render('index')
  getHello(@Body('wall') body: Brick[]): {wall: Brick[]} {
    return {wall: Wrapper.decorate(body)};
  }
}
