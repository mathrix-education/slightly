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
| Event name            | Direction       | Fired when                           | Payload                |
|-----------------------|-----------------|--------------------------------------|------------------------|
| `'flashcard.result'`  | slightly -> app | User finishes for the last flashcard | `FlashcardResultEvent` |
| `'flashcard.exit'`    | slightly -> app | User clicks on the "Terminer" button | `FlashcardExitEvent`   |

#### Exercises
| Event name          | Direction       | Fired when                 | Payload                |
|---------------------|-----------------|----------------------------|------------------------|
| `'exercise.result'` | slightly -> app | User finishes the exercise | `ExerciseResultEvent` |

#### Exams
| Event name      | Direction       | Fired when                        | Payload           |
|-----------------|-----------------|-----------------------------------|-------------------|
| `'exam.pause'`  | slightly -> app | User clicks on the "Pause" button | `ExamPauseEvent`  |
| `'exam.resume'` | app -> slightly | User resumes the exam             | `ExamResumeEvent` |
| `'exam.result'` | slightly -> app | User finishes the exam            | `ExamResultEvent` |