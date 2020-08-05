import { Controller, Get, Param, Render } from '@nestjs/common';
import { Parser } from '../../silicate/spec/parser';
import { LessonsService } from './lessons.service';
import { Lesson } from './lessons';

@Controller('lessons')
export class LessonsController {
  constructor(private readonly trainings: LessonsService, private readonly parser: Parser) {
  }

  @Get(':id')
  @Render('courses')
  find(@Param('id') id: string | number): Promise<Lesson> {
    return this.trainings.findOne(id).then(lesson => {
      lesson.content = this.parser.parse(lesson.content);
      return lesson;
    });
  }
}
