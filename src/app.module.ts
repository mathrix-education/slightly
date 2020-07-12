import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {CoursesModule} from './courses/courses.module';
import {Course} from './courses/course';
import './helpers/eq.helper';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'salome3004',
      database: 'education_local',
      entities: [Course],
      synchronize: false,
      keepConnectionAlive: true
    }),
    CoursesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
