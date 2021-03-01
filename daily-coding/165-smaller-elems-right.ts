/**
 * 
 *            #165 [Medium] - SMALLER ELEMENTS TO THE RIGHT
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

const smallerElemsRight = (arr: number[]): number[] => {
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
 * ASSERTIONS
 */
console.log(JSON.stringify(smallerElemsRight([3, 4, 9, 6, 1])) === '[1,1,2,1,0]');
