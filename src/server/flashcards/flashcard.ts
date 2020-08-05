import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Wall } from '../../silicate/spec/wall';

@Entity({ name: 'flashcards' })
export class Flashcard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'json' })
  content: { front: Wall, back: Wall }[];
}
