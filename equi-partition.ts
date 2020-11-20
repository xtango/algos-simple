/*************** WIP ******************/

/**
 * Determine whether a given set can be partitioned into two subsets such that the sum of elements in both subsets is the same. 
 */
const sum = (arr: number[]): number => {
    return arr.reduce((x, acc) => acc + x, 0);
}

/**
 * @example canPart([1, 5, 11, 5]) -> true because sum(1, 5, 5) = sum (11)
 */
const canPartition = (arr: number[]): boolean => {
    const sorted = arr.sort();  // E.g. 1, 5, 5, 11
    
    // Abort immediately if sum is odd, since to be equi-partionable, sum should be even.
    const fullSum = sum(arr);
    if (fullSum % 2 > 0) {
        return false; 
    }

    /**
     * We move from right to left
     * left           Right         leftSum  rightSum
     * [1, 2, 4, 5]                 12       12-12=0
     * [1, 2, 4]      [5]           12-5=7   0+5=5
     * [2, 4]         [5, 1]        7-1=6    5+1=6  --> true
     * 
     * @example Not partionable
     * [3, 4, 6]
     * [3, 4]       [6]             7        6
     * 
     */
    const partitionHelper = (i: number, leftSum: number): boolean => {
        const rightSum = fullSum - leftSum;

        // Abort immediate: Too large case
        if (leftSum < sorted[i]) { // e.g. 1, 2, 5 where  1 + 2 < 5
            return false;
        } 
        
        if (leftSum > rightSum) { // e.g  sum(1, 2, 4) > sum(5)
            return partitionHelper(i - 1, leftSum + ) // move smallest from left to right
        }

        if (leftSum === rightSum) {
            return true;
        }

        return false;
    }

    return partitionHelper(arr.length -1, fullSum);
}


/**
 * Tests
 */
console.log(sum([1,2,3]) === 6 ? 'Passed' : 'Failed')



