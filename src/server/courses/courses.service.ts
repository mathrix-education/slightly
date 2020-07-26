import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './course';

@Injectable()
export class CoursesService {
  constructor(@InjectRepository(Course) private courses: Repository<Course>) {
  }

  findOne(id) {
    return this.courses.findOne(id);
  }
}
