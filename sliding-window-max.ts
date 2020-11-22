/**
 * MAX OF SLIDING WINDOW
 * Given an array nums, there is a sliding window of size k which is moving from
 * the very left of the array to the very right. You can only see the k numbers 
 * in the window. Each time the sliding window moves right by one position.
 * Return the max sliding window.
 *
 * Example: Input: nums = [1,3,-1,-3,5,3,6,7], and k = 3.  Output: [3,3,5,5,6,7] 
 */

/**
 * Double-Edged-Queue. Stores indices to values in descending order
 */
type DEQ = number[];

/**
 * Pops at right until we find a larger elem. Then pushes at right.
 * 
 * @param arr The sequence of values
 * @param q Double-edge-queue of indices to arr
 * @param index The current index into arr.
 * 
 * Though 'q' stores indices to values in 'arr' in descending order, 
 * for illustration, the example below show values instead of indices.
 * @example deqPushSorted([3, 2, 0], 1) -> [3, 2, 1]  
 * @example deqPushSorted([3, 2, 0], 4) -> [4]
 */
const deqPushSorted = (
    arr: Readonly<number[]>,
    q: DEQ,
    index: number): DEQ => {
    while (q.length > 0
        // When current val is greater than the back of queue, pop
        // (the smaller val is no longer relevant)
        && arr[index] > arr[q[q.length - 1]]) {
        q = deqPopRight(q);
    }
    q.push(index);
    return q;
}
/**
 * Returns a new q without the right-most elem.
 */
const deqPopRight = (q: DEQ): DEQ => q.slice(0, q.length - 1);

/**
 * Assertions
 */
console.log(deqPopRight([1, 2, 3]).join(',') == '1,2');
console.log(deqPushSorted([3, 2, 0], [], 0).join(',') === '0');
console.log(deqPushSorted([3, 2, 0, 1, 4], [0, 1, 2], 3).join(',') === '0,1,3');
console.log(deqPushSorted([3, 2, 0, 1, 4], [0, 1, 2], 4).join(',') === '4');
