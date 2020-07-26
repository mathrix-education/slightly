import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Wall } from '../../silicate/spec/wall';

@Entity({name: 'flashcards'})
export class Flashcard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({type: 'json'})
  fronts: Wall[];

  @Column({type: 'json'})
  backs: Wall[];

  get cards(): {front: Wall; back: Wall}[] {
    return this.fronts.map((front, i) => {
      return {
        front,
        back: this.backs[i] ?? [],
      };
    });
  }
}
