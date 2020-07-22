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

  get total(): number {
    return this.content.reduce((total, brick) => {
      if (brick.kind === 'question') {
        return total + (brick as QuestionBrick).explanations.reduce((sumExplanations, explanation) => {
          return sumExplanations + explanation.points;
        }, 0);
      } else if (brick.kind === 'question-container-brick') {
        return total + (brick as QuestionContainerBrick).children.reduce((sumQuestions, question) => {
          return sumQuestions + question.explanations.reduce((sumExplanations, explanation) => {
            return sumExplanations + explanation.points;
          }, 0);
        }, 0);
      } else {
        return total;
      }
    }, 0);
  }
}