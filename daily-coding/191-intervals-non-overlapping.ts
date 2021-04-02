/**
 *                                      #191 [Easy] - NON-OVERLAPPING - MIN INTERVALS TO REMOVE
 * 
 * This problem was asked by Stripe.
 * 
 * Given a collection of intervals, find the minimum number of intervals you need to remove
 * to make the rest of the intervals non-overlapping. Intervals can "touch", such as
 * [0, 1] and [1, 2], but they won't be considered overlapping.
 * 
 * For example, given the intervals (7, 9), (2, 4), (5, 8), return 1 as the last interval
 * can be removed and the first two won't overlap.The intervals are not necessarily sorted in any order.
 */

type Interval = number[];

const isOverlappingPair = (a: Interval, b: Interval): boolean =>
    // a ----
    // b   -----
    (a[0] < b[0] && a[1] > b[0])
    ||
    // a    -----
    // b ----- 
    (a[0] > b[0] && a[0] < b[1]);

const isOverlapping = (intervals: Interval[]): boolean => {
    for (let i = 0; i < intervals.length; i++) {
        for (let j = i + 1; j < intervals.length; j++) {
            if (isOverlappingPair(intervals[i], intervals[j])) {
                return true;
            }
        }
    }
    return false;
}

/**
 * Recursive func to get all combinations (where order does not matter).
 */
const subsets = (xs: number[] = []): number[][] => {
    if (xs.length === 0) {
        return [[]]
    }
    const [last, sansLast] = [xs[xs.length - 1], xs.slice(0, -1)];
    const subsetsSansLast = subsets(sansLast);
    const subsetsWithLast = subsetsSansLast.map(y => [...y, last]);
    return [...subsetsSansLast, ...subsetsWithLast];
}

const minRemovals = (intervals: Interval[]): number => {
    const nonOverlappingSizes = subsets(intervals as any)
        .filter(s => s.length > 1 && !isOverlapping(s))
        .map(x => x.length);
    const longest = Math.max(...nonOverlappingSizes);
    return intervals.length - longest;
}

/**
 * ASSERTIONS
 */
/**
 *                ------- 
 *  ------
 *          ---------    
 *  --|--|--|--|--|--|--|----
 *  2 3  4  5  6  7  8  9
 */
const [INTERVAL_1, INTERVAL_2, INTERVAL_3] = [[7, 9], [2, 4], [5, 8]];
console.log(isOverlappingPair(INTERVAL_1, INTERVAL_3));
console.log(isOverlappingPair(INTERVAL_3, INTERVAL_1));
console.log(!isOverlappingPair(INTERVAL_2, INTERVAL_1));
console.log(!isOverlappingPair(INTERVAL_1, INTERVAL_2));
console.log(isOverlapping([INTERVAL_1, INTERVAL_3]));

console.log(subsets([1, 2]).length === 4);

console.log(minRemovals([INTERVAL_1, INTERVAL_2, INTERVAL_3]) === 1);
