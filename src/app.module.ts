import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Course} from './courses/course';
import {CoursesModule} from './courses/courses.module';
import './helpers/eq.helper';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Course],
      synchronize: false,
      keepConnectionAlive: true,
    }),
    CoursesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
