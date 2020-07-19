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
      const subject = await exercise.subject;
      const exercises = await subject.exercises;

      console.log(exercises);

      exercise.questions = exercise.questions.map(q => this.parser.parse(q));
      exercise.choices = exercise.choices.map(c => this.parser.parse(c));
      exercise.explanations = exercise.explanations.map(e => e.map(ee => this.parser.parse(ee)));

      return exercise;
    });
  }
}