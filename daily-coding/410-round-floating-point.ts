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
 */
 const roundUpOrDown = (arr: number[]): number[] => {
    const helper = (accum: number[], i:number): number => {
        console.log(`[i: ${i}] ${arr[i]}`);
        if (i >= arr.length) {
            return 0;
        }
        const accumCeil = Math.ceil(arr[i]) + helper(accum, i + 1);
        // const accumFloor = [...accum].push(Math.floor(arr[i]));
        return accumCeil;
    }
    return []
}

const absoluteDiff = (arr1: number[], arr2: number[]): number => {
    return arr1.reduce((accum, elem1, idx) => {
        accum += Math.abs(elem1 - arr2[idx]);
        return accum;
    }, 0);
}

console.log(absoluteDiff([1.3, 2.3, 4.4], [1, 2, 5]))
