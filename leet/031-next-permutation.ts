/**
*                                   31. Next Permutation 
*
* A permutation of an array of integers is an arrangement of its members into a sequence or linear order.

For example, for arr = [1,2,3], the following are considered permutations of arr: [1,2,3], [1,3,2], [3,1,2], [2,3,1].
The next permutation of an array of integers is the next lexicographically greater permutation of its integer. More formally, if all the permutations of the array are sorted in one container according to their lexicographical order, then the next permutation of that array is the permutation that follows it in the sorted container. If such arrangement is not possible, the array must be rearranged as the lowest possible order (i.e., sorted in ascending order).

For example, the next permutation of arr = [1,2,3] is [1,3,2].
Similarly, the next permutation of arr = [2,3,1] is [3,1,2].
While the next permutation of arr = [3,2,1] is [1,2,3] because [3,2,1] does not have a lexicographical larger rearrangement.
Given an array of integers nums, find the next permutation of nums.

The replacement must be in place and use only constant extra memory.
 
Example 1:

Input: nums = [1,2,3]
Output: [1,3,2]
Example 2:

Input: nums = [3,2,1]
Output: [1,2,3]
Example 3:

Input: nums = [1,1,5]
Output: [1,5,1]
 

Constraints:

1 <= nums.length <= 100
0 <= nums[i] <= 100
*/

/**
 * From right to left we find the digit that's not descending-sorted. This 
 * is the index of the candidate digit to replace making the num larger.
 * 
 * @example firstNonDecreasing(4321) -> 0
 * @example firstNonDecreasing(4312) -> 3 as the number 2 is a replacement candidate. Replacing 2 with 1 gives 4321
 */
const firstNonDecreasing = (numArr: number[]): number => {
    let i = numArr.length - 1;
    while (i > 0 && numArr[i - 1] > numArr[i]) {
        i--;
    }
    return i;
}

const idxMinGreaterThan = (arr: number[], val: number): number => {
    let minIdx = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > val && arr[i] < arr[minIdx]) {
            minIdx = i;
        }
    }
    return minIdx;
}

const nextPermutation = (numArr: number[]): void => {
    const replaceIdx = firstNonDecreasing(numArr) - 1;
    const replaceVal = numArr[replaceIdx];
    console.log('startIdx', replaceIdx);

    // @example 43120
    //          findStartIndex([4, 3, 1, 2, 0])                    -> startIdx = 3
    //                                ^         
    //          left, idx, right:                                  -> [4,3]  1, [2, 0]
    //          Replace replaceIdx w/ smallest digit > 1, i.e. 2   ->        2, [1, 0]
    //          Reverse                                            ->        2, [0, 1]
    //          '43' concat '201'                                  -> 4, 3,  2 , 0  1
    if (replaceIdx > 0) {
        const left = numArr.slice(0, replaceIdx);
        const right = numArr.slice(replaceIdx + 1);
        const minIdx = idxMinGreaterThan(right, replaceVal);

        // Swap
        const replaced = right[minIdx];
        right[minIdx] = replaceVal;

        const rightReversed = right.reverse();
        console.log(JSON.stringify(left), replaced, JSON.stringify(rightReversed));

        // In-place updates
        for (let i = 0; i < left.length; i++) {
            numArr[i] = left[i];
        }
        numArr[replaceIdx] = replaced;
        for (let i = 0; i < right.length; i++) {
            numArr[i + left.length + 1] = right[i];
        }
    } else {
        // in-place reverse
        let i = 0, j = numArr.length -1;
        while (i < j) {
            const temp = numArr[i];
            numArr[i] = numArr[j];
            numArr[j] = temp;
            i++;
            j--;
        }
    }
}

/**
 * ASSERTIONS
 */
console.log(firstNonDecreasing([4, 3, 2, 1]) === 0);
console.log(firstNonDecreasing([4, 3, 1, 2]) === 3);
console.log(idxMinGreaterThan([3, 5, 0], 2) === 0);
const x= [4, 3, 1, 2, 0];
nextPermutation(x);
console.log(x.join('') === '43201');
//
 const TEST_2 = [1,2,3];
 nextPermutation(TEST_2);
 console.log(TEST_2.join('') === '132')
