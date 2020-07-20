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

      exercise.contexts = [];
      exercise.questions.forEach((v, index) => {
        exercise.contexts.push({
          question: this.parser.parse(exercise.questions[index]),
          choices: exercise.choices[index].map(c => this.parser.parse(c)),
          solutions: exercise.solutions[index],
          explanations: exercise.explanations[index].map((e) => this.parser.parse(e)),
        })
      });

      return {
        subject,
        exercise,
        exercises,
        current: id
      };
    });
  }
}