import {
  Controller,
  Get,
  Param,
  Render,
} from '@nestjs/common';
import { Parser } from '../../silicate/spec/parser';
import { Exam } from './exam';
import { ExamsService } from './exams.service';

@Controller('exams')
export class ExamsController {
  constructor(private readonly exams: ExamsService, private readonly parser: Parser) {
  }

  @Get(':id')
  @Render('exams')
  find(@Param('id') id: string | number): Promise<Exam> {
    return this.exams.findOne(id).then(exam => {
      exam.content = this.parser.parse(exam.content);

      return exam;
    });
  }
}
