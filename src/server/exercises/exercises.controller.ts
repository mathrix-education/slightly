import {
  Controller,
  Get,
  Param,
  Render,
} from '@nestjs/common';
import {Parser} from '../../silicate/spec/parser';
import {ExercisesService} from './exercises.service';

@Controller('exercises')
export class ExercisesController {
  constructor(
    private readonly exercises: ExercisesService,
    private readonly parser: Parser) {
  }

  @Get(':id')
  @Render('exercises')
  find(@Param('id') id) {
    return this.exercises.findOne(id).then(async (exercise) => {
      exercise.questions = exercise.questions.map(q => this.parser.parse(q));
      exercise.choices = exercise.choices.map(c1 => c1.map(c2 => this.parser.parse(c2)));
      exercise.explanations = exercise.explanations.map(e1 => e1.map(e2 => this.parser.parse(e2)));

      return exercise;
    });
  }
}