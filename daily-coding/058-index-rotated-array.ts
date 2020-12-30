/**
*               #58 - INDEX OF ELEM IN ROTATED ARRAY
*
* Good morning! Here's your coding interview problem for today.
* This problem was asked by Amazon.
*
* An sorted array of integers was rotated an unknown number of times.
* Given such an array, find the index of the element in the array in faster
* than linear time. If the element doesn't exist in the array, return null.
*
* For example, given the array [13, 18, 25, 2, 8, 10] and the element 8,
* return 4 (the index of 8 in the array).
* You can assume all the integers in the array are unique.
*
* SOLUTION
* If we start with a sorted array & rotate (shift left) X times, we get
*          Left Side    Mid     Right Side  // Left sorted?  Right Sorted  Tgt in Left Range
*          ---------    ---     -----------    ------------ -------------  -----------------
*  Sorted: [ 2, 8*,     10,     13, 18, 25] // Yes           Yes           Yes
*  rotate->[8*, 10,     13,     18, 25,  2] // Yes           No            Yes
*  rotate->[10, 13,     18,     25,  2, 8*] // Yes           No            No    
*  rotate->[13, 18,     25,      2, 8*, 10] // Yes           Yes           No
*
* Key Insights:
* a. If Right is NOT sorted, then Left will be sorted and vice versa
* b. We can do a modified version of a binary search.
* c. Left is sorted when nums[midIdx] > nums[lowIdx]
*/

const findIndex = (nums: number[], target: number): number => {
    const MAX_RECUR = 10;

    /**
     * @param low The leftmost index
     * @param high The rightmost index
     */
    const search = (low: number, high: number, depth: number = 0): number => {
        // Base conditions
        if (depth > MAX_RECUR || (low > high)) { // overshot
            return -1;
        }
        const mid = Math.floor(low + ((high - low) / 2));
        //console.log(`[depth: ${depth}] l: ${low}, m: ${mid}, h: ${high}`);

        if (nums[mid] === target) {
            return mid;
        }

        // Left is sorted?
        if (nums[low] <= nums[mid]) {
            // Within left's range?
            if (nums[low] <= target && nums[mid] >= target) {
                return search(low, mid - 1, depth + 1);        
            } else {
                return search(mid + 1, high, depth + 1)
            }
        } else {
            // At this point left is NOT sorted, which means that Right is sorted
            // Within right's range?
            if (nums[mid + 1] <= target && nums[high] >= target) {
                return search(mid+1, high, depth + 1);        
            } else {
                return search(low, mid - 1, depth + 1)
            }
        }
    }

    console.log('FIND INDEX: ', nums, target);
    return search(0, nums.length - 1);
}

/**
 * ASSERTIONS
 */
console.log(findIndex([1, 2, 3, 4, 5, 6], 4) == 3);
console.log(findIndex([13, 18, 25, 2, 8, 10], 8) == 4);
