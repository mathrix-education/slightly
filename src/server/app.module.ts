import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {SilicateModule} from '../silicate/silicate.module';
import {Course} from './courses/course';
import {CoursesController} from './courses/courses.controller';
import {CoursesService} from './courses/courses.service';
import {Exercise} from './exercises/exercise';
import {ExercisesController} from './exercises/exercises.controller';
import {ExercisesService} from './exercises/exercises.service';
import {Flashcard} from './flashcards/flashcard';
import {FlashcardsController} from './flashcards/flashcards.controller';
import {FlashcardsService} from './flashcards/flashcards.service';
import {Subject} from './subjects/subject';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Course, Exercise, Flashcard, Subject],
      synchronize: false,
      keepConnectionAlive: true,
    }),
    TypeOrmModule.forFeature([Course, Exercise, Flashcard, Subject]),
    SilicateModule,
  ],
  controllers: [CoursesController, ExercisesController, FlashcardsController],
  providers: [CoursesService, ExercisesService, FlashcardsService],
})
export class AppModule {
}
