import {
  Controller,
  Get,
  Param,
  Render,
} from '@nestjs/common';
import {CoursesService} from './courses.service';

@Controller('courses')
export class CoursesController {
  constructor(private courses: CoursesService) {
  }

  @Get(':id')
  @Render('course')
  find(@Param('id') id) {
    const course = this.courses.findOne(id);
    return course;
  }
}