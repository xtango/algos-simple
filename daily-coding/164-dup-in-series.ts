/**
 *                  #164 [Medium] - DUP IN SERIES
 *
 * This problem was asked by Google.
 * 
 * You are given an array of length n + 1 whose elements belong to the 
 * set {1, 2, ..., n}. By the pigeonhole principle, there must be a duplicate.
 * Find it in linear time and space.
 */

/**
 * (Sum of nums including dup) - (Series Sum)
 * Normally the sum of a series elems with step 1 is n(n+1)/2.
 * However, with one elem fewer have (n-1)(n-1+1)/2, which is (n-1)(n)/2.
 */
const findDup = (arr: number[]) =>
    arr.reduce((accum, x) => accum + x, 0)
    - ((arr.length - 1) * arr.length / 2);

/**
 * ASSERTIONS
 */
console.log(findDup([1, 2, 3, 3]) === 3);
