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

#### Flashcards
| Event name                | Fired when                              | Payload                          |
|---------------------------|-----------------------------------------|----------------------------------|
| `FlashcardsEvents.mode`   | User switches to training mode          | [FlashcardState][FlashcardState] |
| `FlashcardsEvents.mode`   | User switches to revision mode          | [FlashcardState][FlashcardState] |
| `FlashcardsEvents.reveal` | User reveals a flashcard                | [FlashcardState][FlashcardState] |
| `FlashcardsEvents.reveal` | User reveals a flashcard                | [FlashcardState][FlashcardState] |
| `FlashcardsEvents.end`    | User clicks on "J'ai juste" or "J'ai faux" for the last flashcard | [FlashcardState][FlashcardState] |
| `FlashcardsEvents.end`    | User clicks on the "Terminer" button    | [FlashcardState][FlashcardState] |
| `FlashcardsEvents.retry`  | User clicks on the "Recommencer" button | [FlashcardState][FlashcardState] |

[FlashcardState]: https://github.com/mathrix-education/slightly/blob/main/src/apps/flashcards/ts/flashcards.state.ts