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
 * Double-Edged-Queue. Stores indices to values. When de-referenced the values are 
 * in descending order
 */
type DEQ = number[];

const deqBack = (q: DEQ) => q[q.length - 1];

const deqFront = (q: DEQ) => q[0];

/**
 * Returns a new q without the right-most elem.
 */
const deqPopRight = (q: DEQ): DEQ => q.slice(0, q.length - 1);

/**
 * Returns a new q without the left-most elem.
 */
const deqPopLeft = (q: DEQ): DEQ => q.slice(1);


/**
 * Pops at right until we find a larger elem. Then pushes at right.
 * 
 * @param nums The sequence of values.
 * @param qIndices Queue of indices to nums.  When de-referenced, the resulant
 *                 values are in descending order.
 * @param rightIdx The current index into 'nums'.
 * 
 * Though 'q' stores indices to values in 'nums', for easier understanding
 * these examples use values instead of indices:
 * @example deqPushSorted([3, 2, 0], 1) -> pop, push(1) and return [3, 2, 1]  
 * @example deqPushSorted([3, 2, 0], 4) -> pop thrice, push(4) and return [4]
 */
const deqPushSorted = (
    nums: Readonly<number[]>,
    qIndices: DEQ,
    rightIdx: number,
    k: number): DEQ => {
    // Left window index (inclusive)
    const leftIdx = rightIdx - k - 1;

    while (qIndices.length > 0) {
        // Pop left if front is not in window 
        // if (deqFront(qIndices) < leftIdx) {
        //     console.log('...[popL] qIndices, vals...', qIndices, qIndices.map(x => nums[x]));
        //     qIndices = deqPopLeft(qIndices);
        // }

        if (
            // Pop when 
            // a. Current num is greater than the back of queue
            // (the smaller num is no longer relevant to determine max)
            nums[rightIdx] > nums[deqBack(qIndices)]
            ||
            // or b. When q's back in no longer in the window
            (deqBack(qIndices) < leftIdx)
        ) {
            qIndices = deqPopRight(qIndices);
            console.log('...[popR] qIndices, vals...', qIndices, qIndices.map(x => nums[x])); 
        }
    }

    qIndices.push(rightIdx);
    console.log('...[pushR] qIndices, vals..', qIndices, qIndices.map(x => nums[x])); 
    return qIndices;

}

const prettyWindow = (nums: Readonly<number[]>, k: Readonly<number>, rightIdx: number): string => {
    const prettyNum = (i: number) => {
        const pre = i === rightIdx - k + 1 ? '[' : '';
        const post = i === rightIdx ? ']' : '';
        return `${pre}${nums[i].toString()}${post} `
    };
    return nums.map((undefined, i) => prettyNum(i)).join('');
}

/**
 * 
 */
const slideMax = (nums: Readonly<number[]>, k: Readonly<number>): number[] => {
    console.log('MAX OF SLIDING WIN nums, k', nums, k)
    let q: DEQ = []
    const maxList: number[] = [];
    for (let i = 0; i < nums.length; i++) {
        console.log(`--------i: ${i}, window--------- ${prettyWindow(nums, k, i)}`);
        q = deqPushSorted(nums, q, i, k);

        if (i >= k - 1) {
            console.log('>>> max: ', nums[deqFront(q)]);
            maxList.push(nums[deqFront(q)])
        }
    }

    return maxList;
}

/**
 * Assertions
 */
// console.log(deqPopRight([1, 2, 3]).join(',') == '1,2');
// console.log(deqPushSorted([3, 2, 0], [], 0).join(',') === '0');
// console.log(deqPushSorted([3, 2, 0, 1, 4], [0, 1, 2], 3).join(',') === '0,1,3');
// console.log(deqPushSorted([3, 2, 0, 1, 4], [0, 1, 2], 4).join(',') === '4');
console.log(slideMax([1, 4, 0, 3, 2], 3));
