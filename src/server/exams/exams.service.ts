import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Exam} from './exam';

@Injectable()
export class ExamsService {
  constructor(
    @InjectRepository(Exam) private exams: Repository<Exam>,
  ) {
  }

  findOne(id) {
    return this.exams.findOne(id);
  }
}