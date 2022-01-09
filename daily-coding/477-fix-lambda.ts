/**
 *                  Problem #477 [Easy] - FIX PYTHON lambda
 * 
 * This problem was asked by Dropbox.
 * What does the below code snippet print out? How can we fix the anonymous functions to behave as we'd expect?
 *
 * functions = []
 * for i in range(10):
 *     functions.append(lambda : i)
 * 
 * for f in functions:
 *     print(f())
 */

/**
 * PYTHON   It prints 9 9 ... 9 ten times because i remains 9 after the 1st "for" loop.
 *          Assuming the goal is to print 0..9, change the code to this:
 *
functions = []
for i in range(10):
    functions.append(lambda : i)

i = 0 // <-- Fix
for f in functions:
    print(f())
    i = i + 1 // <-- Fix
*/

/**
 * TYPESCRIPT VERSION
 */
const functions = [];
for (let i = 0; i < 10; i++) {
    functions.push((): number => i);
}

for (let f of functions) {
    console.log(f());
}
