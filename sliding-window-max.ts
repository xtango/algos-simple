/**
 * MAX OF SLIDING WINDOW
 * 
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

const deqBack = (q: DEQ): number => q[q.length - 1];

const deqFront = (q: DEQ): number => q[0];

/**
 * Returns a new q without the right-most elem.
 */
const deqPopRight = (q: DEQ): DEQ => q.slice(0, q.length - 1);

/**
 * Returns a new q without the left-most elem.
 */
const deqPopLeft = (q: DEQ): DEQ => q.slice(1);

/**
 * Formats the q as a string
 */
const deqPretty = (q: DEQ, nums: number[]): string => 'Q: ' + q.map(x => `${x}:${nums[x]}`).join(' ');

const isBackInWindow = (q: DEQ, rightIdx: number, k: number) => {
    const backIdx = deqBack(q);
    const inWin = backIdx > rightIdx - k;
    console.log(`[qback in win] qBack ${backIdx} -> ${inWin}`);
    return inWin;
}

/**
 * Keeps the relant indices for computing max.
 * Pops at right until we find a larger elem. Then pushes at right.
 * Pops at the left any elem that's not in the sliding window.
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
    nums: number[],
    qIndices: DEQ,
    rightIdx: number,
    k: number): DEQ => {

    const MAX_ITER = 10;
    let iter = 0; // Used to prevent stop while loop while debugging

    // PopLleft if front is not in window 
    if (qIndices.length > 0 && deqFront(qIndices) < rightIdx - k) {
         qIndices = deqPopLeft(qIndices);
         console.log(`[q pop left] ${deqPretty(qIndices, nums)}`);
     }

    /**
     * Returns true when current num > back num
     * (the smaller num is no longer relevant to determine max)
     */
    const canPrioritize = (qIndices: DEQ) => {
        const backIdx = deqBack(qIndices);
        const backVal = nums[backIdx];
        const rightVal = nums[rightIdx];
        console.log(`Q (back ${backIdx}:${backVal} < right ${rightIdx}:${rightVal}) -> ${backVal < rightVal}`);

        return backVal < rightVal;
    }


    // Pop until bigger found
    while (qIndices.length > 0
        && iter < MAX_ITER
        && (canPrioritize(qIndices)
        || !isBackInWindow(qIndices, rightIdx, k))
    ) {
        qIndices = deqPopRight(qIndices);
        console.log(`[q pop right] ${deqPretty(qIndices, nums)}`);
        iter++;
    }

    qIndices.push(rightIdx);
    console.log(`[q push right] ${deqPretty(qIndices, nums)}`);
    return qIndices;

}

/**
 * Returns the max of the sliding window of k elements in nums.
 */
const slideMax = (nums: number[], k: Readonly<number>): number[] => {
    console.log(`MAX OF SLIDING WIN nums: ${nums.join(' ')}, k: ${k}`);
    let q: DEQ = []
    const maxList: number[] = [];
    for (let i = 0; i < nums.length; i++) {
        console.log(`--------i: ${i}, window: ${prettyWindow(nums, k, i)}, ${deqPretty(q, nums)}`);
        q = deqPushSorted(nums, q, i, k);

        // if (i >= k - 1) {
        //     console.log('>>> max: ', nums[deqFront(q)]);
        //     maxList.push(nums[deqFront(q)])
        // }
    }

    return maxList;
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
 * Assertions
 */
// Test deq
console.log(deqBack([8, 7, 9]) === 9);
console.log(deqBack([]) === undefined);
// console.log(deqPopRight([1, 2, 3]).join(',') == '1,2');
// console.log(deqPushSorted([3, 2, 0], [], 0).join(',') === '0');
// console.log(deqPushSorted([3, 2, 0, 1, 4], [0, 1, 2], 3).join(',') === '0,1,3');
// console.log(deqPushSorted([3, 2, 0, 1, 4], [0, 1, 2], 4).join(',') === '4');
console.log(slideMax([1, 4, 0, 3, 2, 6], 3));
