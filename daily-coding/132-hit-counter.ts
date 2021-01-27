/** 
 *                        #132 [Easy] - HIT COUNTER
 * 
 * This question was asked by Riot Games.
 *
 * Design and implement a HitCounter class that keeps track of requests (or hits). It should support the following operations:
 *    record(timestamp): records a hit that happened at timestamp
 *    total(): returns the total number of hits recorded
 *    range(lower, upper): returns the number of hits that occurred between timestamps lower and upper (inclusive)
 * Follow-up: What if our system has limited memory?
 * 
 * SOLUTION
 * Simple bin search of sorted array. 
 * Follow up. If limited memory, can either page to disk or convserve mem by bucketing (and losing accuracy).
 */

/**
 * Returns the closest index > midpoint.
 */
const binSearch = (arr: number[], val: number, startIdx: number = 0, endIdx: number = arr.length - 1): number => {
    const MAX_ITER = 10;

    if (val < arr[startIdx] || val > arr[endIdx]) {
        return -1;
    }

    let [i, midIdx] = [0, 0];
    while (startIdx <= endIdx && i < MAX_ITER) {
        midIdx = Math.floor((startIdx + endIdx) / 2); // mid= 9
        // console.log('start mid end', startIdx, midIdx, endIdx);
        const mid = arr[midIdx];
        if (val === mid) {
            return midIdx;
        } else if (val < mid) {
            endIdx = midIdx - 1;
        } else {
            startIdx = midIdx + 1;
        }
        i++;
    }
    return midIdx;
}

class HitsCounter {
    hits: number[] = [];

    record(timestamp: number) {
        this.hits.push(timestamp);
        return this;
    }

    total(): number {
        return this.hits.length;
    }


    /**
     * Returns the number of hits that occurred between timestamps lower and upper (inclusive)
     */
    range(lower: number, upper: number): number {
        const upperIdx = binSearch(this.hits, upper);
        const lowerIdx = binSearch(this.hits, lower);
        return upperIdx - lowerIdx + (this.hits[lowerIdx] === lower ? 1 : 0);
    }
}

/**
 * ASSERTIONS
 */
// Test bin search
console.log(binSearch([9, 10], 11) === -1);
console.log(binSearch([9, 10], 9) === 0);
console.log(binSearch([9, 10], 10) === 1);
console.log(binSearch([3, 5, 9, 10, 20], 11) === 4);

// Test counter
const counter = new HitsCounter();
counter.record(10).record(20).record(30);
console.log(counter.total() === 3);
console.log(counter.range(10, 30) === 3);
console.log(counter.range(15, 30) === 2);
console.log(counter.range(20, 30) === 2);
