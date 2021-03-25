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
const longestDistinctSubArray = (arr: number[]): number => {
    let [i, longest] = [0, 0];
    while (i < arr.length) {
        let j = i;
        let dict = new Set();
        while (j < arr.length && !dict.has(arr[j])) {
            dict.add(arr[j]);
            j++;
        }
        // console.log(dict);
        longest = Math.max(longest, dict.size)
        i++;
    }
    return longest;
}

/**
 * ASSERTIONS
 */
console.log(longestDistinctSubArray([5, 1, 5, 4]) === 3);
console.log(longestDistinctSubArray([5, 1, 3, 5, 2, 3, 4, 1]) === 5);
