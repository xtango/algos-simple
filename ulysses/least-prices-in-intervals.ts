/**
 *                  LEAST PRICES IN INTERVALS
 * 
 * For the algorithm, assume all vendors are selling the same product
 * and there is only one product being sold. Given a list that has
 * vendor information - ( startTime, endTime, price ) of the deal,
 * return a sorted list with different possible intervals and
 * the least price of the product during the interval.
 * The interval is inclusive of start and end time.
 * 
 * All the 3 values passed by the vendor are integers.
 *
 * Example
 * const sampleInput = [new Interval(1, 5, 20), new Interval(3, 8, 15), new Interval(7, 10, 8)];
 * const expectedOutput = [new Interval(1, 2, 20), new Interval(3, 6, 15), new Interval(7, 10, 8)];
 *
 * Approach
 * 
 * sortedByPrice = (7, 10, 8), (3, 8, 15), (1, 2, 20)
 *
 *                                              AFTER MERGE OF SAME PRICES
 * eventTime    splits      price               interval    price
 * 1            1, 2        20                  1, 2        20
 * 3            3, 4        15                  
 * 5            5, 6        15                  3, 6        15  
 * 7            7,  7       8                   
 * 8            8, 9        8
 * 10           10, 10      8                    7, 10       8
 */
class Interval {
    constructor(readonly start: number, readonly end: number, readonly price: number) { }
}

const getSplits = (intervals: Interval[]): number[][] => {
    //  unique start and end points
    const points = new Set<number>()
    intervals.forEach(i => points.add(i.start).add(i.end))
    const events: number[] = Array.from(points).sort((a, b) => a - b)
    
    const splits: number[][] = [];
    for (let i = 1; i < events.length; i++) {
        splits.push([events[i-1], 
        i === events.length - 1 ? events[i] : events[i]-1]
        )
    }
    return splits;
}

const leastPrices = (intervals: Interval[]): Interval[] => {
    const sortedByPrice = intervals.sort((a, b) => a.price - b.price)
    console.log(sortedByPrice)
    const splits = getSplits(intervals);
    console.log('splits', splits)

    // At each split, check cheapest price
    const minIntervals = []
    splits.forEach(s => {
        // find event in sorted intervals
        const [start, end] = [s[0], s[1]];
        const found = sortedByPrice.find(inter =>
            start >= inter.start && end <= inter.end)
        if (found) {
            const inter = { start, end, price: found.price }
            minIntervals.push(inter)
        }
    })
    return minIntervals;
}

const mergeSamePriceWhenNoGaps = (intervals: Interval[]): Interval[] => {
    const len = intervals.length
    const merged = []
    let start = intervals[0].start
    for (let i = 1; i < len; i++) {
        const [prevPrice, price] = [intervals[i - 1].price, intervals[i].price]
        const isLast = i === len - 1;
        if (prevPrice !== price || isLast) {
            const mergedInterval = new Interval(
                start,
                intervals[i].start - 1,
                prevPrice)
            merged.push(mergedInterval);
            start = intervals[i].start
        }
    }
    return merged
}

// ASSERTIONS
const sampleInput = [new Interval(1, 5, 20), new Interval(3, 8, 15), new Interval(7, 10, 8)];
const expectedOutput = [new Interval(1, 2, 20), new Interval(3, 6, 15), new Interval(7, 10, 8)];
const least = leastPrices(sampleInput)
const merged = mergeSamePriceWhenNoGaps(least)
console.log(JSON.stringify(merged))
console.log(JSON.stringify(expectedOutput))
