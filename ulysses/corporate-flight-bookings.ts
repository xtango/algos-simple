/**
 *          Corporate Flight Bookings (Leetcode problem)
 */
const corpFlightBookings = (bookings: number[][], n: number): number[] {
    // initialize nums to 0
    let nums = new Array(n).fill(0);

    // Build difference array
    let diffs = new DifferenceArray(nums);

    for (let booking of bookings) {
        // note that converting to array index needs to subtract one
        let i = booking[0] - 1;
        let j = booking[1] - 1;
        let val = booking[2];
        // increment the range nums[i..j] by val
        diffs.increment(i, j, val);
    }
    // return the final result array
    return diffs.toResultArray();
};

class DifferenceArray {
    // The difference array
    diff: number[];

    constructor(nums: number[]) {
        this.diff = new Array(nums.length).fill(0);
        this.diff[0] = nums[0];
        for (let i = 1; i < nums.length; i++) {
            this.diff[i] = nums[i] - nums[i - 1];
        }
    }

    /**
     * Increment the closed interval [i, j] by val (can be negative)
     */
    increment(i: number, j: number, val: number) {
        this.diff[i] += val;
        if (j + 1 < this.diff.length) {
            this.diff[j + 1] -= val;
        }
    }

    /**
     * Returns a result array based on the difference array
     */
    toResultArray(): number[] {
        let res = new Array(this.diff.length);
        res[0] = this.diff[0];
        for (let i = 1; i < this.diff.length; i++) {
            res[i] = res[i - 1] + this.diff[i];
        }
        return res;
    }
}
