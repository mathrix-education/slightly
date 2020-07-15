import {
  Controller,
  Get,
  Param,
  Render,
} from '@nestjs/common';
import {Parser} from '../../silicate/spec/parser';
import {CoursesService} from './courses.service';

@Controller('courses')
export class CoursesController {
  constructor(
    private readonly courses: CoursesService,
    private readonly parser: Parser) {
  }

  @Get(':id')
  @Render('course')
  find(@Param('id') id) {
    return this.courses.findOne(id).then((course) => {
      course.content = this.parser.parse(course.content);
      return course;
    });
  }
}