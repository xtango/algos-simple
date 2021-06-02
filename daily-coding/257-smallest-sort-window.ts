/**
 *      Problem #257 [Easy] - SMALLEST WINDOW THAT MUST BE SORTED
 * 
 * This problem was asked by WhatsApp.
 * 
 * Given an array of integers out of order, determine the bounds 
 * of the smallest window that must be sorted in order for the
 * entire array to be sorted.
 * For example, given [3, 7, 5, 6, 9], you should return (1, 3).
 */

/**
 * Naive version that sorts the array.
 */
const sortWindowNaive = (arr: number[]): number[] => {
    const sorted = [...arr].sort((a, b) => a - b);
    let [left, right] = [0, arr.length - 1];

    while (left < right && arr[left] === sorted[left]) {
        left++;
    }

    while (right > left && arr[right] === sorted[right]) {
        right--;
    }

    return [left, right];
}

/**
 * ASSERTIONS
 */
const EXPECTATIONS = [
    // Already sorted case
    [[1, 2, 3, 5, 7], '[4,4]'],

    // Unsorted cases    
    [[3, 7, 5, 6, 9], '[1,3]'],
    [[9, 7, 5, 10, 12], '[0,2]'],
    [[12, 10, 9, 7, 5], '[0,4]'] // desc sorted case
];
console.log(
    EXPECTATIONS.map(x => JSON.stringify(sortWindowNaive(x[0])) === x[1])
);
