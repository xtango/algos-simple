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
 * Naive version using a sorted array.
 */
const sortWindowNaive = (arr: number[]): number[] => {
    const sorted = [...arr].sort((a, b) => a - b);
    let [start, end] = [0, arr.length - 1];

    while (start < end && arr[start] === sorted[start]) {
        start++;
    }
    while (end > start && arr[end] === sorted[end]) {
        end--;
    }
    return [start, end];
}

/**
 * A solution in linear time.
 */
const sortWindow = (arr: number[]): number[] => {
    let [minFound, maxFound] = [Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY];
    let [start, end] = [0, arr.length - 1];

    for (let i = 0; i < arr.length; i++) {
        // Set end
        if (arr[i] > maxFound) {
            maxFound = arr[i];
        }
        if (arr[i] < maxFound) {
            end = i;
        }

        // Set start
        let j = arr.length - 1 - i;
        if (arr[j] < minFound) {
            minFound = arr[j];
        }
        if (arr[j] > minFound) {
            start = j;
        }
    }
    return [start, end];
}

/**
 * ASSERTIONS
 */
const EXPECTATIONS = [
    [[3, 7, 5, 6, 9], '[1,3]'],
    [[9, 7, 5, 10, 12], '[0,2]'],
    [[12, 10, 9, 7, 5], '[0,4]'] // desc sorted case
];
console.log(EXPECTATIONS.every(x => JSON.stringify(sortWindowNaive(x[0])) === x[1]));
console.log(EXPECTATIONS.every(x => JSON.stringify(sortWindow(x[0])) === x[1]));
