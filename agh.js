const pipe = function () {

    const functionalPipe = (fns) => x => fns.reduce((v, f) => f(v), x);

    return async function pipe(inputStream, outputStream, ...modifiers) {
        const asyncIterable = modifiers.length ? functionalPipe(modifiers)(inputStream) : inputStream;

        for await (const chunk of asyncIterable) {
            outputStream.write(chunk);
        }

        return outputStream;
    }
}();

const asyncGeneratorsFactory = function (cb) {
    return async function* (asyncIterable) {
        for await (const chunk of asyncIterable) {
            const res = await cb(chunk);
            if (typeof res != 'undefined') yield res;
        }
    }
}

exports.pipe = pipe;
exports.asyncGeneratorsFactory = asyncGeneratorsFactory;