# Slightly

A static renderer for Mathrix Education content, specifically crafted for the
[@nota/nativescript-webview-ext](https://github.com/Notalib/nativescript-webview-ext) NativeScript plugin.

Proudly maintained by:

- Mathieu Bour <mathieu@mathrix.fr> (https://github.com/mathieu-bour)
- Dimitri Bret <dimitri@mathrix.fr> (https://github.com/dimitri-bret)

## NativeScript integration
### Types for NativeScript Bridge
Types for client-side TypeScript integration are available into the `@mathrix-education/slightly` package.

```bash
npm install @mathrix-education/slightly
```

### Events specification
All events can be debugged in the browser console using the web version of Slightly.

#### Video Brick (all apps)
| Event name     | Direction       | Fired when       | Payload         |
|----------------|-----------------|------------------|-----------------|
| `'video.load'` | slightly -> app | Video was loaded |`VideoLoadEvent` |

#### Flashcards
| Event name            | Direction       | Fired when                           | Payload                 |
|-----------------------|-----------------|--------------------------------------|-------------------------|
| `'flashcard.revise'`  | app -> slightly | User finishes for the last flashcard | `FlashcardReviseEvent`  |
| `'flashcard.training'`| app -> slightly | User switch to training mode         | `FlashcardTrainingEvent`|
| `'flashcard.reveal'`  | app -> slightly | User reveal the card                 | `FlashcardRevealEvent`  |
| `'flashcard.next'`    | app -> slightly | User goes to next flashcard '        | `FlashcardNextEvent`    |
| `'flashcard.redo'`    | app -> slightly | User clicks on the "Restart" button  | `FlashcardRedoEvent`    |

#### Exercises
| Event name          | Direction       | Fired when                 | Payload                |
|---------------------|-----------------|----------------------------|------------------------|
| `'exercise.result'` | slightly -> app | User finishes the exercise | `ExerciseResultEvent` |

#### Exams
| Event name      | Direction       | Fired when                        | Payload           |
|-----------------|-----------------|-----------------------------------|-------------------|
| `'exam.result'` | slightly -> app | User corrected all questions      | `ExamResultEvent` |
| `'exam.finish'` | app -> slightly | User wants to see correction      | `ExamFinishEvent` |
| `'exam.restart' | app -> slightly | User restart the exam             | `ExamResultEvent` |
