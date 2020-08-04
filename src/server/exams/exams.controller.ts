import { Controller, Get, Res } from '@nestjs/common';
import { Parser } from '../../silicate/spec/parser';
import { ExamsService } from './exams.service';
import { Response } from 'express';

@Controller('exams')
export class ExamsController {
  constructor(private readonly exams: ExamsService, private readonly parser: Parser) {
  }

  @Get(':id')
  async find(@Res() res: Response) {
    const exam = await this.exams.findOne(res.req.params.id);
    exam.content = this.parser.parse(exam.content);
    return res.render(exam.duration ? 'exams' : 'courses', exam);
  }
}
