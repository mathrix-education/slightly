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

      exercise.questions = exercise.questions.map(q => this.parser.parse(q));
      exercise.choices = exercise.choices.map(c1 => c1.map(c2 => this.parser.parse(c2)));
      exercise.explanations = exercise.explanations.map(e1 => e1.map(e2 => this.parser.parse(e2)));

      const exIndex = exercises.findIndex((ex) => ex.id === exercise.id);
      const nextId = exIndex === exercises.length - 1 ? null : exercises[exIndex + 1].id;

      return {
        subject,
        exercise,
        exercises,
        nextId,
      };
    });
  }
}