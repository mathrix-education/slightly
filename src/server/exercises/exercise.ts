import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Wall } from '../../silicate/spec/wall';
import { Subject } from '../subjects/subject';

@Entity({name: 'exercises'})
export class Exercise {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column({type: 'json'})
  questions: Wall[];

  @Column({type: 'json'})
  choices: Wall[][];

  @Column({type: 'json'})
  solutions: number[][];

  @Column({type: 'json'})
  explanations: Wall[][];

  @ManyToOne(
    type => Subject,
    subject => subject.exercises,
  )
  @JoinColumn({name: 'subject_id'})
  subject: Promise<Subject>;
}
