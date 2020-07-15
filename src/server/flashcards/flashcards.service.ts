import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Flashcard} from './flashcard';

@Injectable()
export class FlashcardsService {
  constructor(
    @InjectRepository(Flashcard) private flashcards: Repository<Flashcard>,
  ) {
  }

  findOne(id) {
    return this.flashcards.findOne(id);
  }
}