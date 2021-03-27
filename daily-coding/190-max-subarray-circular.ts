
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
 * The key idea of Kadane's algo is that the i'th max (or min is either:
 *  a. The previousPeakSum, (see val -1 in the example below)
 *  or 
 *  b. The previousPeakSum combined with the current val (3 in the example below)
 * 
 * Example:
 *          8               -1          3                  4
 * local    8       max(8, 8-1)=8   max(8, 8+3)=11     max(11, 11+4)=15
 * global   8               8           11                  15
 */
const subArrayKadane = (arr: number[], extremeFunc: (a: number, b: number) => number): number[] => {
    const localPeakAtI: number[] = [arr[0]];

    for (let i = 1; i < arr.length; i++) {
        const prev = localPeakAtI[i - 1];
        const local = arr[i] >= 0 
        ? extremeFunc(prev, prev+ arr[i]) 
        : arr[i]; // reset for neg
        localPeakAtI.push(local);
    }
    return localPeakAtI;
}

const maxSubArray = (arr: number[]) => Math.max(...subArrayKadane(arr, Math.max));

const maxSubArrayCircular = (arr: number[]): number => {
    const localMaxes = subArrayKadane(arr, Math.max);
    let remaining = localMaxes[0];
    let globalMax = localMaxes[0];

    for (let i = 0; i < localMaxes.length; i++) {
        globalMax = Math.max(globalMax, localMaxes[i]);

        if (localMaxes[0] < 0 || i > 0 && localMaxes[i] < localMaxes[i - 1]) {
            break;
        }

        remaining = Math.max(remaining, globalMax);
    }

    console.log({globalMax, remaining});

    return Math.max(globalMax, remaining + localMaxes[localMaxes.length - 1]);

}
console.log(JSON.stringify(subArrayKadane([8, -1, 3, 4], Math.max)) === '[8,-1,2,6]');
console.log(subArrayKadane([-1, -1, 3, 4], Math.max));
// console.log(maxSubArray([8, -1, 3, 4]) === 15); // 3 + 4  + 8
//console.log(minSubArray([8, -1, 3, 4]));
//console.log(maxSubArrayCircular([8, -1, 3, 4]));
