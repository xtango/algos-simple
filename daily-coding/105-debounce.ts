/**
 *                              #105 [Easy] - DEBOUNCER
 *
 * This problem was asked by Facebook.
 * Given a function f, and N return a debounced f of N milliseconds.
 *
 * That is, as long as the debounced f continues to be invoked, f itself will not be called for N milliseconds.
 */

/**
 * Returns a function that is a a debounced version of f.
 *
 *                  debounce()    debouncedF()     f()
 * ---debounce(f, 100)-->|            |             |  // Return debounced func
 * ---debouncedF()------------------->|             |  // Skip            
 * ---debouncedF()------------------->|             |  // Skip              
 * ---debouncedF()------------------->|------------>|  // Invoke f() because > 100msecs
 */
const debounce = (f: () => any, nMsecs: number): () => any => {
    let startTime = new Date();

    return () => {
        const now = new Date();
        const lapsedMsecs = now - startTime;
        if (lapsedMsecs >= nMsecs) {
            startTime = now;
            console.log(`[${now.toISOString()}] debounce() diff: ${lapsedMsecs} -> invoke`);
            f();
        } else {
            console.log(`[${now.toISOString()}] debounce() diff: ${lapsedMsecs} -> skip`);
        }
    }
}

/**
 * ASSERTIONS
 */
let counter = 0;
const f = () => counter++;
const debouncedF = debounce(f, 100);

// Multiple calls within 100msecs
debouncedF();
console.log(counter === 0);
debouncedF();
console.log(counter === 0);

// Wait for 200msecs
setTimeout(() => {
    debouncedF();
    console.log(counter === 1);
}, 200);
