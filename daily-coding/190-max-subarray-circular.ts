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
 * 
 * Given [-4, 5, 1, 0], return 6 as we choose the numbers 5 and 1.
 */

/**
 * The key idea of Kadane's algo is that the i'th peak is
 * either 
 *  the previousPeakSum 
 *  or the previousPeakSum combined with the current val.
 */
const maxSubArrayKadane = (arr: number[]): number => {
    let [localPeakAtI, globalPeak] = [arr[0], arr[0]];
    for (let i = 0; i < arr.length; i++) {
        localPeakAtI = Math.max(localPeakAtI, localPeakAtI + arr[i]);
        globalPeak = Math.max(localPeakAtI, globalPeak);
    }
    return globalPeak;
}

const maxSubArrayCircular = (arr: number[]): number => {
}

console.log(maxSubArrayKadane([8, -1, 3, 4]) === 14);
