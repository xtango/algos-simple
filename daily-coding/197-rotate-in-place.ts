/**
 *                      #197 [Easy] - ROTATE IN PLACE
 * 
 * This problem was asked by Amazon.
 * 
 * Given an array and a number k that's smaller than the length of the array,
 * rotate the array to the right k elements in-place.
 */

/**
 * ->      1 2 3 4   tmp = 4
 * 
 * ->      1 2 3 3
 * ->      1 2 2 3
 * ->      1 1 2 3
 * -> tmp->4 1 2 3
 */
const rotateOne = (arr: number[]): number[] => {
    const tmp = arr[arr.length - 1];
    for (let i = arr.length - 1; i > 0; i--) {
        arr[i] = arr[i - 1];
    }
    arr[0] = tmp;
    return arr;
}

const rotate = (arr: number[], k: number): number[] => {
    for (let i = 0; i < k; i++) {
        rotateOne(arr);
    }
    return arr;
}

/**
 * ASSERTIONS
 */
console.log(rotateOne([1, 2, 3, 4]).join(',') === '4,1,2,3');
console.log(rotate([1, 2, 3, 4], 2).join(',') === '3,4,1,2');
