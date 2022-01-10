/**
 *                      Problem #476 [Medium] - FIND DUPLICATE PIGEONHOLE
 * 
 * This problem was asked by Google.
 * 
 * You are given an array of length n + 1 whose elements belong to the set {1, 2, ..., n}.
 * By the pigeonhole principle, there must be a duplicate. Find it in linear time and space.
 */

const findDup = (input: number[]): number => {
    const arr = new Array(input.length + 1).fill(0);
    for (let i = 0; i < input.length; i++) {
        const val = input[i];
        if (arr[val] === 0) {
            arr[val] = 1;
        } else {
            return val;
        }
    }
    return -1;
}

/**
 * ASSERTIONS
 */
console.log(findDup([1, 2, 2]) === 2);
console.log(findDup([1, 2, 3]) === -1);
console.log(findDup([3, 1, 3, 2, 4]) === 3);
