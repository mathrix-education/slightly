import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'lessons' })
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'json'})
  content: any[];
}
