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

#### Video Brick
| Event name               | Fired when                           | Payload                |
|--------------------------|--------------------------------------|------------------------|
| `'video.fullscreen.in'`  | Video went in fullscreen             | `VideoFullScreenEvent` |

| Event name               | Fired when                           | Payload                |
|--------------------------|--------------------------------------|------------------------|
| `'video.fullscreen.out'` | Video went out from fullscreen       | `VideoFullScreenEvent` |


#### Flashcards
| Event name            | Fired when                           | Payload                |
|-----------------------|--------------------------------------|------------------------|
| `'flashcard.result'`  | User finishes for the last flashcard | `FlashcardResultEvent` |
| `'flashcard.exit'`    | User clicks on the "Terminer" button | `FlashcardExitEvent`   |
