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
    return this.courses.findOne(id);
  }
}