import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exercise } from './exercise';

@Injectable()
export class ExercisesService {
  constructor(@InjectRepository(Exercise) private exercises: Repository<Exercise>) {
  }

  findOne(id: string | number): Promise<Exercise> {
    return this.exercises.findOne(id);
  }
}
