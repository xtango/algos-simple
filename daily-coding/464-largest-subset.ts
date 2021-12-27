/**
 *                      Problem #464 [Medium] - LARGEST SUBSET
 *
 * This problem was asked by Google.
 * 
 * Given a set of distinct positive integers, find the largest subset such 
 * that every pair of elements in the subset (i, j) satisfies either
 * i % j = 0 or j % i = 0.
 * 
 * For example, given the set [3, 5, 10, 20, 21], you should return [5, 10, 20]. 
 * Given [1, 3, 6, 24], return [1, 3, 6, 24].
 */

/**
 * This brute force approach generates all subsets after sorting the input.
 * We assume that "subset" in this problem does NOT have to be contiguous.
 */
const naive = (input: number[]): number[] =>
    powerset(input, true)
        .reduce((accum, x) =>
            x.length > accum.length && everyPairValid(x) ? x : accum);

const sortedCopy = (arr: number[]) => [...arr].sort((a, b) => a - b);

/**
 * Returns true when every pair of eleme statisfies i%j = 0 or j%i=0.
 */
const everyPairValid = (arr: number[]): boolean => {
    const penultimate = arr.length - 1;
    for (let i = 0; i < penultimate; i++) {
        if (arr[i] % arr[i + 1] !== 0 && arr[i + 1] % arr[i] !== 0) {
            return false;
        }
    }
    return true;
}

/**
 * Returns the subsets (i.e. powerset) of arr
 */
const powerset = (arr: number[], sortResults: boolean = true): number[][] => {
    const subs: number[][] = [[]];

    // @example If arr = [1, 2, 3]
    //          Start with subs = []         -> []
    //          concat 1 to each subset      -> [] + [1]
    //          concat 2 to each subset      -> ([], [1]) + ([2], [1, 2])
    //          concat 3 to each subset      -> ([], [1], [2], [1, 2]) + ([3], [1, 3], [2, 3], [1, 2 ,3]
    for (const el of arr) {
        const last = subs.length - 1;
        for (let i = 0; i <= last; i++) {
            const newSubset = [...subs[i], el];
            subs.push(sortResults ? sortedCopy(newSubset) : newSubset);
        }
    }
    return subs;
}

/**
 * ASSERTIONS
 */
console.log(everyPairValid([5, 10, 20]) === true);
console.log(naive([3, 5, 10, 20, 21]).join(',') === '5,10,20');
console.log(naive([1, 3, 6, 24]).join(',') === '1,3,6,24');
