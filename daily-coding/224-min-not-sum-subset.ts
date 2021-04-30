/**
 *
 *                 Problem #224 - SMALLEST NOT SUM OF subset
 * 
 * This problem was asked by Amazon.
 * 
 * Given a sorted array, find the smallest positive integer that is not the sum of a subset of the array.
 * For example, for the input [1, 2, 3, 10], you should return 7.
 * Do this in O(N) time.
 */

/**
 * The naive approach is to find all subsets and sums for each subset: 
 * subs = [1], [1, 2], [1, 2, 3]...
 * sums = [1, 3, 6,...] , and try out min numbers incrementing by 1,
 * ie. 1, 2, 3 ... against all sums.
 * 
 * A better approach in O(n) time is to loop through each number taking 
 * advantage that they are sorted. We increment min by x rather than by 1, as follows
 *      x     min     x > min we found it. Otherwise min += x  
 *      ----  -----   ----------------------------------------  
 *      1     1       1 > 1 -> False, min = 1 + 1 = 2
 *      2     2       2 > 2 -> False, min = 2 + 2 = 4
 *      3     4       3 > 4 -> False, min = 4 + 3 = 7
 *      10    7       10 > 7-> True, FOUND
 */
const notSum = (arr: number[]): number => {
    let [min, i] = [
        1, // start with smallest positive int
        0];
    while (arr[i] <= min && i < arr.length) {
        min += arr[i];
        i++;
    }
    return min;
}

/**
 * ASSERTIONS
 */
console.log(notSum([2]) === 1);
console.log(notSum([1]) === 2);
console.log(notSum([1, 1]) === 3);
console.log(notSum([1, 2, 10]) === 4);
console.log(notSum([1, 2, 3, 10]) === 7);
