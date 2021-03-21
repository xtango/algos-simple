/**
 *            #184 [Easy] - GREATEST COMMON DENOMINATOR
 *
 * This problem was asked by Amazon.
 * 
 * Given n numbers, find the greatest common denominator between them.
 * For example, given the numbers [42, 56, 14], return 14.
 */

/**
 * Returns the GCD using the Euclidean algo.
 */
const gcdPair = (a: number, b: number): number => {
    while (b) {
        [a, b] = [b, a % b];
    }
    return a;
}

const gcd = (nums: number[]): number => {
    let gcdVal = nums[0];
    for (let i = 1; i < nums.length; i++) {
        gcdVal = gcdPair(gcdVal, nums[i]);
    }
    return gcdVal;
}

/**
 * ASSERTION
 */
console.log(gcd([72, 48]) === 24);
console.log(gcd([42, 56, 14]) === 14);
