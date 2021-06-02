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

const sortWindow = (arr: number[]): number[] => {
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
// Already sorted case
console.log(JSON.stringify(sortWindow([1, 2, 3, 5, 7])) == '[4,4]');

// Unsorted cases
console.log(JSON.stringify(sortWindow([3, 7, 5, 6, 9])) === '[1,3]');
console.log(JSON.stringify(sortWindow([9, 7, 5, 10, 12])) === '[0,2]');

// Descending sort case
console.log(JSON.stringify(sortWindow([12, 10, 9, 7, 5])) === '[0,4]');
