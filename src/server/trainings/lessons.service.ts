import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './lessons';

@Injectable()
export class LessonsService {
  constructor(@InjectRepository(Lesson) private lessons: Repository<Lesson>) {
  }

  findOne(id: string | number): Promise<Lesson> {
    return this.lessons.findOne(id);
  }
}
