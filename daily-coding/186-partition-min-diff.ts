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

const partition = (arr: number[]): number => {
    const arrSum = arr.reduce((accum, x) => accum + x, 0);

    const minDiffsMemo: { [i: number]: number } = {};

    /**
     * Returns the absolute value of the min diff
     */
    const partitionHelper = (i: number, sum: number, depth: number = 0): number => {
        console.log(`[depth: ${depth}] part`, { arrSum, i, val: arr[i], sum });
        const memoVal = minDiffsMemo[i]
        if (memoVal !== undefined) {
            return memoVal;
        }

        if (i < 0) {
            return Math.abs(arrSum - sum);
        }

        if (depth > 5) {
            return -1; // abort
        }

        // Including and excluding the i'th elem
        const diffInclude = partitionHelper(i - 1, sum + arr[i], depth + 1);
        const diffExclude = partitionHelper(i - 1, sum, depth + 1);
        const diffMin = Math.min(diffInclude, diffExclude);
        
        minDiffsMemo[i] = diffMin;
        
        console.log(`[depth: ${depth}]`, { i, diffInclude, diffExclude, diffMin });
        console.log(minDiffsMemo);
        return diffMin;
    }

    return partitionHelper(arr.length - 1, 0);
}

console.log(partition([2, 4, 1]))
