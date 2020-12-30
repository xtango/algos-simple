/**
 *                 #095 NEXT GREATER PERMUTATION [Hard]
 * 
 * This problem was asked by Palantir.
 *
 * Given a number represented by a list of digits, find the next greater
 * permutation of a number, in terms of lexicographic ordering. If there
 * is not greater permutation possible, return the permutation with the 
 * lowest value/ordering.
 *
 * For example, the list [1,2,3] should return [1,3,2].
 * The list [1,3,2] should return [2,1,3]. 
 * The list [3,2,1] should return [1,2,3].
 * Can you perform the operation without allocating extra memory (disregarding the input memory)?
 */

/**
 * Returns the permutations of the list of digits using Heap's algo
 */
const heapPermutation = (arr: number[]): number[][] => {
    const accum: number[][] = [];

    const generate = (a: number[], k: number) => {
        if (k === 1) {
            accum.push([...a]);
            return;
        }

        // Generate permutations with kth unaltered. Initially k == length(arr)
        generate(a, k - 1);

        // Generate permutations for kth swapped with each k-1 initial
        for (let i = 0; i < k - 1; i++) {
            if (k % 2 === 0) { // Even
                [a[i], a[k - 1]] = [a[k - 1], a[i]]; // zero-indexed, the kth is at k-1
            } else { // Odd
                [a[0], a[k - 1]] = [a[k - 1], a[0]];
            }

            // Recursive call to swap tail elements
            generate(a, k - 1);
        }
    }

    generate([...arr], arr.length)
    return accum;
}

/**
 * @example toNumber([9, 2, 3]) === 923
 */
const toNumber = (arr: number[]) => {
    return arr.reduce((accum, x, idx) => {
        accum += Math.pow(10, arr.length - idx - 1) * x;
        return accum;
    }, 0);
}
/**
 * Returns the arrays in lexicographic order.
 */
const lexSort = (arr: number[][]) => {
    const k = arr[0].length;
    return arr.sort((a, b) => toNumber(a) - toNumber(b));
}

const next = (arr: number[]) => {
    const sorted = lexSort(heapPermutation(arr));
    const targetAsNum = toNumber(arr);
    const foundIdx = sorted.findIndex(x => toNumber(x) === targetAsNum);
    return (foundIdx === arr.length - 1) ? sorted[0] : sorted[foundIdx + 1];
}

/**
 * ASSERTS
 */
console.log(JSON.stringify(heapPermutation([1, 2])) === '[[1,2],[2,1]]');
console.log(toNumber([9, 2, 3]) === 923);
console.log(next([1, 2, 3]).join(',') === `1,3,2`);
