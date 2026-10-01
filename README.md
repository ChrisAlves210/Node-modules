# Node Module Practice

A dependency-free CommonJS package with three utility modules.

## Modules

- `randomInteger(min, max)` returns a random integer between the inclusive bounds. Both bounds must be integers, and `min` must not exceed `max`.
- `spacesToDashes(value)` trims a string and replaces each run of whitespace with a dash.
- `countWords(value)` counts words separated by whitespace. An empty or whitespace-only string returns `0`.

## Use

```js
const { randomInteger, spacesToDashes, countWords } = require('./');

console.log(randomInteger(1, 10));
console.log(spacesToDashes('hello node modules'));
console.log(countWords('hello node modules'));
```

Run the tests with:

```sh
npm test
```

## Run the website

Start the local website with:

```sh
npm start
```

Then open [http://127.0.0.1:3000](http://127.0.0.1:3000). The page uses the same modules through a small built-in Node.js HTTP server.

Also made this Accessable for all people 
