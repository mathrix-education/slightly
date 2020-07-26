import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {QuestionBrick} from '../../silicate/bricks/question-brick/question-brick';
import {QuestionContainerBrick} from '../../silicate/bricks/question-container-brick/question-container-brick';
import {Wall} from '../../silicate/spec/wall';

@Entity({name: 'exams'})
export class Exam {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  duration: number | null;

  @Column({type: 'json'})
  content: Wall;

  get minutes() {
    return this.duration ? Math.round(this.duration / 60) : null;
  }
}