import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {SilicateModule} from '../silicate/silicate.module';
import {Course} from './courses/course';
import {CoursesController} from './courses/courses.controller';
import {CoursesService} from './courses/courses.service';
import {Flashcard} from './flashcards/flashcard';
import {FlashcardsService} from './flashcards/flashcards.service';
import {FlashcardsController} from './flashcards/flashcards.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Course, Flashcard],
      synchronize: false,
      keepConnectionAlive: true,
    }),
    TypeOrmModule.forFeature([Course, Flashcard]),
    SilicateModule,
  ],
  controllers: [CoursesController, FlashcardsController],
  providers: [CoursesService, FlashcardsService],
})
export class AppModule {
}
