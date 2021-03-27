
/**
 *                            #190 [Medium] - MAX SUBARRAY OF CIRCULAR ARRAY
 *
 * This problem was asked by Facebook.
 *
 * Given a circular array, compute its maximum subarray sum in O(n) time. 
 * A subarray can be empty, and in this case the sum is 0.
 * 
 * For example, given [8, -1, 3, 4], return 15 as we choose the numbers 3, 4,
 * and 8 where the 8 is obtained from wrapping around.
 * Given [-4, 5, 1, 0], return 6 as we choose the numbers 5 and 1.
 */

type SubArrayState = { start: number; end: number; sum: number }

const newSubarray = () => { return { start: 0, end: 0, sum: 0 } };

/**
 * Implementation of Kadane's algo to find a contiguous subarray with the largest sum. 
 * The salient idea is that the i'th max is either:
 *  a. The current sum when val is negative (-1 in the example below)
 *  b. Or, the current sum combined with the current elem (3 in the example below)
 * 
 * @see https://en.wikipedia.org/wiki/Maximum_subarray_problem
 * 
 * @example:
 *      numbers            8               -1          3                  4
 *      current (Local)    8       max(8, 8-1)=8   max(8, 8+3)=11     max(11, 11+4)=15
 *      best (Global)      8               8           11                  15
 */
const maxSubarrayKadane = (nums: number[]): SubArrayState => {
    let [current, best] = [newSubarray(), newSubarray()];

    nums.forEach(elem => {
        if (current.sum <= 0) {
            // Start a new subarray at the current elem
            current.start = current.end;
            current.sum = elem;
        } else {
            // Extend the existing subarray with the current elem
            current.sum += elem;
        }

        if (current.sum > best.sum) {
            // Set global peak
            best.sum = current.sum;
            best.start = current.start;
            best.end = current.end + 1; //  the +1 is to make the best end exclusive
        }
    });

    return best;
}

/**
 * Given nums, a circular array, returns the max sum in O(N) time and O(N) space.
 */
const maxCircularSubarray = (nums: number[]): number => {
    const max = maxSubarrayKadane(nums);
    let maxWrap = 0;
    const numsClone = [...nums];
    numsClone.forEach((x, i) => {
        maxWrap += x;
        numsClone[i] = -numsClone[i];
    });
    maxWrap += maxSubarrayKadane(numsClone).sum
    return Math.max(maxWrap, max.sum)
}

/**
 * ASSERTIONS
 */
console.log(maxSubarrayKadane([]).sum === 0);
console.log(maxCircularSubarray([]) === 0);
console.log(maxSubarrayKadane([8, -1, 3, 4]).sum === 14); // 8 -1 + 3 + 4
console.log(maxCircularSubarray([8, -1, 3, 4]) === 15); // 3 + 4 + 8
console.log(maxSubarrayKadane([-4, 5, 1, 0]).sum === 6); // 5 + 1
console.log(maxCircularSubarray([-4, 5, 1, 0]) === 6); // 5 + 1
