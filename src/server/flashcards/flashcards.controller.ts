import {
  Controller,
  Get,
  Param,
  Render,
} from '@nestjs/common';
import {Parser} from '../../silicate/spec/parser';
import {FlashcardsService} from './flashcards.service';

@Controller('flashcards')
export class FlashcardsController {
  constructor(
    private readonly flashcards: FlashcardsService,
    private readonly parser: Parser) {
  }

  @Get(':id')
  @Render('flashcards')
  find(@Param('id') id) {
    return this.flashcards.findOne(id).then((flashcard) => {
      flashcard.fronts = flashcard.fronts.map((wall) => this.parser.parse(wall));
      flashcard.backs = flashcard.backs.map((wall) => this.parser.parse(wall));

      return {...flashcard, cards: flashcard.cards};
    });
  }
}