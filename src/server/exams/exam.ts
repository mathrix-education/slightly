import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Wall } from '../../silicate/spec/wall';

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

  get minutes(): number | null {
    return this.duration ? Math.round(this.duration / 60) : null;
  }
}
