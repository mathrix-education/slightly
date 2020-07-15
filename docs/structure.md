# Project structure

The project is subdivised into two main parts.

1. The server, based on Nest.js, which handles the static render.
2. The "bus", written in plain JS vanilla, which handles the user interactions and the data bus.

## Bricks
The bricks definitions are located in to src/silicate directory.

- A brick **has** at least a `[NAME].hbs`, which is the Handlebars view of the brick.
- A brick _might_ have a `[NAME].hbs` which is a TypeScript class which extends the `Brick` abstract class.
  This class is used to edit the brick data during render.
- A brick _might_ have a `[NAME].scss` which contains the brick style.
  Remember that unlike Angular, generated style is not sandboxed to the brick element.
- A brick _might_ have a `[NAME].bus.ts` which contains the browser side of the script.
  All `*.bus.ts` will be bundle into `js/bus.js` and run into the browser.