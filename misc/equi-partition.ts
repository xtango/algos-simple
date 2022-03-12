/**
 * Given a multiset of integers, return whether it can be partitioned into two subsets 
 * whose sums are the same.
 *
 * For example, given the multiset {15, 5, 20, 10, 35, 15, 10}, 
 * it would return true, since we can split it up into 
 * {15, 5, 10, 15, 10} and {20, 35}, which both add up to 55.
 *
 * Given the multiset {15, 5, 20, 10, 35}, it would return false, since we can't split it
 * up into two subsets that add up to the same sum.
 */

/**
 * Returns the sum of arr
 */
const sum = (arr: number[]): number => {
    return arr.reduce((x, acc) => acc + x, 0);
}

/**
 * Determines whether arr can be partitioned  into 2 subsets whose sums are the same.
 * @example equiPartitionable([1, 5, 11, 5]) -> true because sum([1, 5, 5]) equals sum([11])
 */
const equiPartitionable = (arr: number[]): boolean => {
    /**
     * We move from numbers from the left hand side to the right.
     * Left           Right     Left Sum    RightSum
     * -------------  --------  ---------   -----------------------------------------------
     * @example Partionable
     * [1, 2, 4, 5]   []        12          12-12=0
     * [1, 2, 4]      [5]       12-5=7      0+5=5
     * [2, 4]         [5, 1]    7-1=6       5+1=6  --> return true when leftSum == rightSum
     * 
     * @example Not partionable
     * [3, 4, 6]
     * [3, 4]         [6]       7           6      --> return false when leftSum > rightSum 
     * 
     * @param i Right index. We start from array length -1 and decrement it.
     */
    const partitionHelper = (i: number, leftSum: number): boolean => {
        const rightSum = fullSum - leftSum;

        console.log('[partition] i, leftSum, rightSum', i, leftSum, rightSum);

        if (i === 0) {
            return false;
        }

        // Abort immediate: Too large case
        if (leftSum < arr[i]) { // e.g. 1, 2, 5 where  1 + 2 < 5
            return false;
        }

        if (leftSum > rightSum) { // e.g  sum(1, 2, 4) > sum(5)
            const leftIdx = arr.length - i;
            return partitionHelper(i - 1, leftSum - arr[leftIdx]) // move leftmost to the right
        } else if (leftSum === rightSum) {
            return true;
        }

        return false;
    }

    console.log('EQUI PARTITIONABLE', arr);
    arr.sort((a, b) => a - b);

    // Abort immediately if sum is odd, since to be equi-partionable, sum should be even.
    const fullSum = sum(arr);
    if (fullSum % 2 > 0) {
        return false;
    }
    return partitionHelper(arr.length - 1, fullSum - arr[arr.length - 1]);
}


/**
 * Tests
 */
console.log(sum([1, 2, 3]) === 6 ? 'Passed' : 'Failed');
console.log(equiPartitionable([1, 5, 11, 5]) === true ? 'Passed' : 'Failed')
console.log(equiPartitionable([1, 1, 3, 4, 7]) === true ? 'Passed' : 'Failed')
console.log(equiPartitionable([2, 3, 4, 6]) === false ? 'Passed' : 'Failed');
