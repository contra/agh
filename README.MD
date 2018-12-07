## Async Generators Helpers

Read about me on [Medium](https://medium.com/@andreasimonecosta/goodbye-transform-streams-long-live-es9-async-generators-86e60284fb80)


Let's see how to use the `asyncGeneratorsFactory` to transform a function into an async generator:
```js
const { asyncGeneratorsFactory } = require('agh');

// filter function
const onlyOddPlease = function (n) {
    // assuming that 'n' is a number
    if (n % 2) return n;
}

// transform function
const plusOne = function (n) {
   return n + 1;
}

const onlyOddPleaseGen = asyncGeneratorsFactory(onlyOddPlease);
const plusOneGen = asyncGeneratorsFactory(plusOne);
```
You can see that filter functions must return undefined only when a chunk has to be discarded. Normal transform functions must always return a value. Composition functions are not yet supported, but I'm working on them.



Let's see how to pipe the generators for handle streams (Node.js)
```js
const { pipe } = require('agh');

(async function IIAFE() {
    // pipe(inputStream, outputStream [, ...asyncGenerators]);
    // it returns the outputStream
    await pipe(inputStream, outputStream, onlyOddPleaseGen, plusOneGen);
})();
```
