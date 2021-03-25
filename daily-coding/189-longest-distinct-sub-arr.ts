/**
 *                  #189 - LONGEST DISTINCT SUB array
 * 
 * This problem was asked by Google.
 * 
 * Given an array of elements, return the length of the 
 * longest subarray where all its elements are distinct.
 * 
 * For example, given the array [5, 1, 3, 5, 2, 3, 4, 1],  return 5 
 * as the longest subarray of distinct elements is [5, 2, 3, 4, 1]
 */

/**
 * We keep an start index pointing to the sub array start.
 * In addtion we use a dictionary to keep the val->index mapping
 * When we find a duplicate withing the subarray we move the start pointer to dict[val] + 1
 *
 * Idx  0  1  2  3
 *      -----------
 * Val  5  1  3  1
 *      ^
 *    start: 0
 * 
 * Whe we hit 1 again, we move start to foundIdx + 1.
 *            3  1              
 *            ^
 *            start: dict[1] + 1 = 2
 */
const longestDistinctSubArray = (arr: number[]): number => {
    // Array val to index map
    const dict: { [val: number]: number } = {};
    
    let [start, longest] = [0, 0];

    for (let i = 0; i < arr.length; i++) {
        const val = arr[i];
        const foundIdx = dict[val];
    
        // When found index is within the last subarray
        if (foundIdx >= start) {
            longest = Math.max(longest, i - start);
            start = foundIdx + 1;
        } else if (i === arr.length - 1) {
            // Special case when last element
            longest = Math.max(longest, i - start + 1);
        }
        dict[val] = i; // Update with new index
    }
    return longest;
}

/**
 * ASSERTIONS
 */
console.log(longestDistinctSubArray([5, 1, 5, 4]) === 3);
console.log(longestDistinctSubArray([5, 1, 5, 5]) === 2);
console.log(longestDistinctSubArray([5, 1, 3, 5, 2, 3, 4, 1]) === 5);
