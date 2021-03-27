/**
 *                      #192 [Medium] - CAN REACH END OF ARRAY
 * 
 * This problem was asked by Google.
 * 
 * You are given an array of nonnegative integers. Let's say you start at the beginning 
 * of the array and are trying to advance to the end. You can advance at most, the number of
 * steps that you're currently on. Determine whether you can get to the end of the array.
 * 
 * For example, given the array [1, 3, 1, 2, 0, 1], we can go from indices 0 -> 1 -> 3 -> 5, so return true.
 * Given the array [1, 2, 1, 0, 0], we can't reach the end, so return false.
 */

const range = (start: number, len: number): number[] => Array.from(new Array(len), (x, i) => i + start);

const canReachEnd = (arr: number[]): boolean => {
    const traverse = (idx: number): boolean => {
        if (idx >= arr.length - 1) {
            return true;  // reached!
        }
        const indices = range(idx + 1, arr[idx]);
        //console.log('traverse', {idx, val: arr[idx], indices: indices.join(',')});
        for (let i = 0; i < indices.length; i++) {
            if (traverse(indices[i])) {
                return true;  // reached
            }
        }
        return false;
    }

    return traverse(0);
}

/**
 * ASSERTIONS
 */
console.log(canReachEnd([1, 3, 1, 2, 0, 1]) === true);
console.log(canReachEnd([1, 2, 1, 0, 0]) === false);
