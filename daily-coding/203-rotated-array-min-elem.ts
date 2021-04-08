/**
 *              #203 [Medium]- MIN ELEMENT IN ROTATED ARRAY
 * 
 * This problem was asked by Uber.
 * 
 * Suppose an array sorted in ascending order is rotated at some pivot unknown to you beforehand
 * Find the minimum element in O(log N) time. You may assume the array does not contain duplicates.
 * For example, given [5, 7, 10, 3, 4], return 3.
 */

/** 
 * Using the example in the prob description, the sorted array is [3, 4, 5, 7, 10]
 * 
 * Example 1: Given Sorted Rotated Left once    [4, 5, 7, 10, 3]
 * 
 *            Halving gives                     [4, 5] 7 [10, 3], where 7 is the midpoint
 *            4 <= 7, so we know the left half is sorted and the min elem is on the right of mid.
 *            We continue recursively with the right half.
 * 
 * Example 2: Given Sorted Rotated right once   [10, 3, 4, 5, 7]
 *            Halving gives                     [10, 2] 4 [5, 7]
 *            10 > 4, we conclude that the right half is sorted and the min elem is on the left of mid
 *            We continue recursively with the left half.
 */

const minElemRotated = (arr: number[]): number => {

    const minElem = (start: number, end: number, depth: number = 0): number {
        // console.log({depth, start, end, slice: arr.slice(start, end + 1).join(' ')});
        if (depth > arr.length) {
            console.log('aborting');
            return -1;
        }

        if (start >= end) {
            return arr[start]; // Found min elem
        }

        const mid = Math.floor((start + end) / 2);
        if (arr[0] <= arr[mid]) { // left half is sorted. Min elem is on the right
            start = mid + 1;
        } else { // right half is sorted. Min elem is on the left (including mid)
            end = mid;
        }
        return minElem(start, end, depth + 1);
    }

    return minElem(0, arr.length - 1)
}

/**
 * ASSERTIONS
 */
console.log(minElemRotated([4, 5, 7, 10, 3]) === 3);
console.log(minElemRotated([10, 3, 4, 5, 7]) === 3);
