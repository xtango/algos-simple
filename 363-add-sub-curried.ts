/**
 *                       Problem #363 [Medium] - ADD SUBTRACT CURRIED
 * 
 * This problem was asked by Squarespace.
 * 
 * Write a function, add_subtract, which alternately adds and subtracts curried arguments.
 * Here are some sample operations:
 * add_subtract(7) -> 7
 * add_subtract(1)(2)(3) -> 1 + 2 - 3 -> 0
 * add_subtract(-5)(10)(3)(9) -> -5 + 10 - 3 + 9 -> 11
 */

/**
 * APPROACH @see https://medium.com/javascript-scene/curry-and-function-composition-2c208d774983
 */
 /**
  * Takes a AND returns a new function, which in turn takes b and computes and returns the sum of a and b
  */
const add2Args = a => b => a + b;

 /**
  * Takes a and returns a new function, which in turn takes b and returns a new func,
  * which then computes and returns a + b - c
  */
const addSub3Args = a => b => c => a + b - c;

/**
 * ASSERTIONS
 */
console.log(add2Args(7)(3) === 10);
console.log(addSub3Args(7)(3)(10) === 0);


/**
 * Function that takes a variable num of args *** WIP ***
 */
//
// const curry = (fn) => {
//     return  (...args) => {
//         console.log('args', args);
//         //console.log('fn', fn, fn.length)
//         if (args.length >= fn.length) {
//             //console.log('args >=');
//             return fn(...args)
//         } else {
//             console.log('args <');
//             return fn.bind(null, ...args);
//         }
//     }
// }

// const addPair = (a, b) => a + b
// const addSub = (a, b, c) => a + b - c

// //console.log(curry(addPair)(4)(3))
// //console.log(curry(addPair)(4)(3)(3))
// //curry3Args((a, b, c) => a + b - c)(4)(3)(7)

// console.log(curry2Args( (a, b) => a + b)(3)(7))
