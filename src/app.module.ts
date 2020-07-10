import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AppController} from './app.controller';
import {CoursesModule} from './courses/courses.module';
import {Course} from './entities/course';

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
    }),
    CoursesModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [],
})
export class AppModule {
}
