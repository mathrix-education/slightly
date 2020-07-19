import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Exercise} from './exercise';

@Injectable()
export class ExercisesService {
  constructor(
    @InjectRepository(Exercise) private courses: Repository<Exercise>,
  ) {
  }

  findOne(id) {
    return this.courses.findOne(id);
  }
}