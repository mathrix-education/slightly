import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Wall } from '../../silicate/spec/wall';

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
}
