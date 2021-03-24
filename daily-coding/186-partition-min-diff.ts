/**
 *                            #186 [Hard] - PARTITION WITH MIN SUM DIFFERENCE -  **** WORK IN PROGRESS ****
 * 
 * This problem was asked by Microsoft.
 *
 * Given an array of positive integers, divide the array into two subsets such that 
 * the difference between the sum of the subsets is as small as possible.
 *
 * For example, given [5, 10, 15, 20, 25], 
 * return the sets {10, 25} and {5, 15, 20}, which has a difference of 5, 
 * which is the smallest possible difference.
 */

const minSumDiff = (arr: number[]): number => {
    const arrSum = arr.reduce((accum, x) => accum + x, 0);
    const minDiffsMemo: { [key: string]: number } = {};

    /**
     * Returns the absolute value of the min diffs of 2 partitions of arr
     */
    const minSumDiffHelper = (i: number, sum: number, depth: number = 0): number => {
        const key = `${i}_${sum}`;
        const memoVal = minDiffsMemo[key];
        if (memoVal !== undefined) {
            return memoVal;
        }

        if (i < 0) {
            // (this subset's sum) - (other subset's sum)
            return Math.abs(sum - (arrSum - sum));
        }

        if (depth > 5) {
            return -1; // abort
        }

        // Including and excluding the i'th elem
        const diffInclude = minSumDiffHelper(i - 1, sum + arr[i], depth + 1);
        const diffExclude = minSumDiffHelper(i - 1, sum, depth + 1);
        const diffMin = Math.min(diffInclude, diffExclude);
        minDiffsMemo[key] = diffMin;
        // console.log(`[depth: ${depth}]`, { i, sum, diffInclude, diffExclude, diffMin });
        // console.log(minDiffsMemo);
        return diffMin;
    }

    return minSumDiffHelper(arr.length - 1, 0);
}

/**
 * ASSERTIONS
 */
console.log(minSumDiff([1, 3, 6]) === 2);
console.log(minSumDiff([3, 1, 3, 3, 1]) === 1);
console.log(minSumDiff([5, 10, 15, 20, 25]) === 5);
