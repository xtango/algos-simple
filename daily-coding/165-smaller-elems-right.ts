/**
 * 
 * Problem #165 [Medium] - SMALLER ELEMENTS TO THE RIGHT
 * 
 * This problem was asked by Google.
 * 
 * Given an array of integers, return a new array where each element in 
 * the new array is the number of smaller elements to the right of that
 * element in the original input array.
 * For example, given the array [3, 4, 9, 6, 1], return [1, 1, 2, 1, 0], since:
 * 
 * There is 1 smaller element to the right of 3
 * There is 1 smaller element to the right of 4
 * There are 2 smaller elements to the right of 9
 * There is 1 smaller element to the right of 6
 * There are no smaller elements to the right of 1
 */

/**
 * Naive version: O(n^2) time
 */
const smallerRightNaive = (arr: number[]): number[] => {
    const smaller = new Array(arr.length).fill(0);
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[i]) {
                smaller[i]++;
            }
        }
    }
    return smaller;
}


/**
 * O(log N) time
 * Approach: Traverse from the right. Use 2 lists:
 * 1) The first is a sorted list of visited (from the right). Insert the new num into the sorted list.
 * 2) The second list of indices for the output.
 */
const smallerRightFast = (arr: number[]): number[] => {
    const visitedSorted: number[] = []
    const smallerIndices: number[] = [];
    for (let i = arr.length - 1; i >= 0; i--) {
        const insertedIdx = insertSorted(visitedSorted, arr[i]);
        smallerIndices.splice(0, 0, insertedIdx); // insert at head
    }
    return smallerIndices;
}

/**
 * In-place insert of num into the provided sorted array. Returns the index of the inserted num.
 */
const insertSorted = (sorted: number[], num: number): number => {
    let low = 0;
    let high = sorted.length;

    while (low < high) {
        const mid = (low + high) >> 1; // faster than Math.floor( (low + high) / 2)
        if (sorted[mid] > num) {
            high = mid; // on left
        } else {
            low = mid + 1; // on right
        }
    }

    sorted.splice(low, 0, num);
    return low;
};



/**
 * ASSERTIONS
 */
console.log(JSON.stringify(smallerRightNaive([3, 4, 9, 6, 1])) === '[1,1,2,1,0]');
console.log(insertSorted([1, 3], 2) === 1);
console.log(JSON.stringify(smallerRightFast([3, 4, 9, 6, 1])) === '[1,1,2,1,0]');
