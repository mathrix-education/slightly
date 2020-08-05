import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({name: 'courses'})
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'json'})
  content: any[];
}
