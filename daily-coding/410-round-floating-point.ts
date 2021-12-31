/**
 *                          #410 [Hard] - ROUND FLOATING-POINT

This problem was asked by Airbnb.

You are given an array X of floating-point numbers x1, x2, ... xn. These can be rounded up or down to create a corresponding array Y of integers y1, y2, ... yn.

Write an algorithm that finds an appropriate Y array with the following properties:

The rounded sums of both arrays should be equal.
The absolute pairwise difference between elements is minimized. In other words, |x1- y1| + |x2- y2| + ... + |xn- yn| should be as small as possible.

For example, suppose your input is [1.3, 2.3, 4.4]. In this case you cannot do better than [1, 2, 5],
which has an absolute difference of |1.3 - 1| + |2.3 - 2| + |4.4 - 5| = 1.2
*/

/**
 * Uses ceil and floor
 *                          
 *                         / (4.4->5)
 *                (2.3->3)
 *               /         \ (4.4->4)
 *      (1.3->2)             
 *               \        / (4.4->5)
 *                (2.3->2)
 *                        \ (4.4->4)
 * 
 *      (1.3->1) ....            
 *  */
const roundUpOrDown = (floatArr: number[]): number => {
    const roundedSumOfFloatArr = floatArr.reduce((accum, x) => {
        accum += Math.round(x);
        return accum;
    }, 0)

    const helper = (
        floatArrSubset: number[],
        roundedArrSubset: number[],
        cumulDiff: number = 0
    ): { diff: number, path: number[] } => {
        const [curr, currCeil, currFloor] = [
            floatArrSubset[0],
            Math.ceil(floatArrSubset[0]),
            Math.floor(floatArrSubset[0])];

        console.log(`[curr: ${curr}]`);

        // recurse
        const restUp = helper(
            floatArrSubset.slice(1),
            [currCeil, ...roundedArrSubset],
            cumulDiff + Math.abs(curr - currCeil));
        const restDown = helper(
                floatArrSubset.slice(1),
                [currFloor, ...roundedArrSubset],
                cumulDiff + Math.abs(curr - currFloor));
        const best = restUp.diff < restDown.diff ? restUp : restDown;
        return {
            diff: best.diff,
            path: best.path
        }
    }

}

return helper(0, true);
}

const absoluteDiff = (arr1: number[], arr2: number[]): number => {
    return arr1.reduce((accum, elem1, idx) => {
        accum += Math.abs(elem1 - arr2[idx]);
        return accum;
    }, 0);
}

// console.log(absoluteDiff([1.3, 2.3, 4.4], [1, 2, 5]))
console.log(roundUpOrDown([1.3, 2.3, 4.4]))