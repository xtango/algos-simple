/**
 *                          #410 [Hard] - ROUND FLOATING-POINT ARRAY
 * 
 * This problem was asked by Airbnb.
 * 
 * You are given an array X of floating-point numbers x1, x2, ... xn.
 * These can be rounded up or down to create a corresponding array Y of integers y1, y2, ... yn.
 * Write an algorithm that finds an appropriate Y array with the following properties:
 *      The rounded sums of both arrays should be equal.
 *      The absolute pairwise difference between elements is minimized.
 *      In other words, |x1- y1| + |x2- y2| + ... + |xn- yn| should be as small as possible.
 * 
 * For example, suppose your input is [1.3, 2.3, 4.4]. In this case you cannot do better than [1, 2, 5],
 * which has an absolute difference of |1.3 - 1| + |2.3 - 2| + |4.4 - 5| = 1.2
 */

interface SearchResult { diff: number, path: number[] }

const NOT_FOUND: SearchResult = { diff: Number.POSITIVE_INFINITY, path: [] };

/**
 * This implementation recursively traverses all paths. The top is the ceil
 * and the bottom is the floor.
 * 
 *                         / (4.4->5)
 *                (2.3->3)
 *               /         \ (4.4->4)
 *      (1.3->2)             
 *    /          \         / (4.4->5)
 *   /            (2.3->2)
 *   \                     \ (4.4->4)
 *    \ 
 *      (1.3->1) ...    
 */
const roundUpDownArray = (inputFloatArr: number[]): number[] => {
    const inputFloatArrRoundedSum = roundedSum(inputFloatArr);

    /**
     * Helper function for recursive calls.
     * 
     * @param cumulRoundedSum The cumulative sum of the rounded values. Needed to check 
     *                        for "The rounded sums of both arrays should be equal."
     * 
     * @param cumulDiff The cumulative sum of |xn- yn|. Needed to check for 
     *                  "the absolute pairwise difference between elements is minimized."
     */
    const helper = (
        i: number,
        roundedArrSubset: number[] = [],
        cumulRoundedSum: number = 0,
        cumulDiff: number = 0
    ): SearchResult => {
        console.log(`[i: ${i}] path: ${roundedArrSubset.join(',')}`);

        // Base case: when past last array elem,
        //            check "The rounded sums of both arrays should be equal."
        if (i >= inputFloatArr.length) {
            const roundedSumsEqual = cumulRoundedSum === inputFloatArrRoundedSum;
            console.log(`\tEnd. Rounded sums ${cumulRoundedSum} =? ${inputFloatArrRoundedSum} ${roundedSumsEqual}`);
            console.log(`\tDiff: ${cumulDiff}`);
             
            return roundedSumsEqual
                ? {
                    diff: cumulDiff,
                    path: roundedArrSubset
                }
                : NOT_FOUND;
        }

        const curr = inputFloatArr[i];
        const [currCeil, currFloor] = [Math.ceil(curr), Math.floor(curr)];
        console.log(`\t floor, curr, ceil: ${currFloor} ${curr} ${currCeil}`);

        // recurse
        const ceilResult = helper(
            i + 1,
            [...roundedArrSubset, currCeil],
            cumulRoundedSum + currCeil,
            cumulDiff + Math.abs(curr - currCeil));
        const floorResult = helper(
            i + 1,
            [...roundedArrSubset, currFloor],
            cumulRoundedSum + currFloor,
            cumulDiff + Math.abs(curr - currFloor));
        const minDiff = ceilResult.diff < floorResult.diff ? ceilResult : floorResult;

        return { diff: minDiff.diff, path: minDiff.path }
    }

    return helper(0).path;
}

/**
 * Note that the javascript round function differs from many other languages
 */
const roundedSum = (arr: number[]) => arr.reduce((accum, x) => accum + Math.round(x), 0);

/**
 * ASSERTIONS
 */
console.log(roundedSum([1.3, 2.3, 4.4]) === 7);

// Note: The answer expected in the problem statement is [1, 2, 5], 
//       which sums up to 8 instead of 7 and has an absolute difference of 
//       |1.3 - 1| + |2.3 - 2| + |4.4 - 5| = 1.2
//       The diff we get from the implemented above is Diff: 1.0000000000000002
console.log(roundUpDownArray([1.3, 2.3, 4.4]).join(',') === '1,2,4')
