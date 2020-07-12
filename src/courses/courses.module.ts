import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {SilicateModule} from '../silicate/silicate.module';
import {Course} from './course';
import {CoursesController} from './courses.controller';
import {CoursesService} from './courses.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Course]),
    SilicateModule,
  ],
  providers: [CoursesService],
  exports: [TypeOrmModule],
  controllers: [CoursesController],
})
export class CoursesModule {
}
