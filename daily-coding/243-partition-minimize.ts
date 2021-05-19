/**
 *                  Problem #243 [Medium]
 * 
 * This problem was asked by Etsy.
 * Given an array of numbers N and an integer k, your task is to split N into k partitions
 * such that the maximum sum of any partition is minimized. Return this sum.
 * 
 * For example, given N = [5, 1, 2, 7, 3, 4] and k = 3, you should return 8, since the
 * optimal partition is [5, 1, 2], [7], [3, 4].
 */


/**
 *      0, 1, 2
 * 
 * [[0], [1,2]], [[0, 1][2]]
 */
const splitsTwo = (arr: number[]): number[][][] => {
    const parts: number[][][] = [];
    for (let i = 1; i < arr.length; i++) {
        parts.push([arr.slice(0, i), arr.slice(i)]);
    }
    return parts;
}

const splits = (arr: number[], k: number): number[][][] => {
    if (arr.length === 1) {
        return [[arr]];
    }

    if (k === 2) {
        return splitsTwo(arr);
    }

    const parts = [];
    for (let i = 1; i < arr.length; i++) {
        const left = arr.slice(0, i);
        const right = arr.slice(i);
        const leftSplits = splits(left, k - 1);
        const rightSplits = splits(right, k - 1);
        console.log({ ls: JSON.stringify(leftSplits), rs: JSON.stringify(rightSplits)});
        leftSplits.forEach(l => rightSplits.forEach(r => {
            console.log({l: JSON.stringify(l), r: JSON.stringify(r)});
             // parts.push(l.concat(r));
        }));
    }
    return parts;
}

// const optimalPartition = (arr: number[], k: number): number => {
//     // example: [5, 1, 2], [7], [3, 4]:
//     const paritionEnds = [];
//     for (let p = 0; p < k - 2; p++) {
//         partionEnds[]
//     }

//     return -1;
// }
console.log(JSON.stringify(splitsTwo([0, 1])) === '[[[0],[1]]]');
console.log(JSON.stringify(splitsTwo([0, 1, 2])) === '[[[0],[1,2]],[[0,1],[2]]]');
console.log(JSON.stringify(splits([0, 1, 2, 3], 3)));
