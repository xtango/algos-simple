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
 */
class Interval { constructor(readonly start: number, readonly end: number, readonly price: number) { } }

const leastPrices = (intervals: Interval[]): Interval[] => {
    const sortedByPrice = intervals.sort((a, b) => a.price - b.price)
    console.log(sortedByPrice)

    //  unique start and end points
    const points = new Set<number>()
    intervals.forEach(i => points.add(i.start).add(i.end))
    const events: number[] = Array.from(points).sort((a, b) => a - b)
    console.log('uniqPoints', events)

    // at each event, check cheapest price
    let i = 1;
    const minIntervals = []
    let [len, start] = [events.length, 1]
    while (i < len) {
        // find event in sorted intervals
        const end = events[i]
        console.log('find ', start, end)
        const found = sortedByPrice.find(inter =>
            start >= inter.start && end <= inter.end)
        if (found) {
            const inter = { start, end: i == len - 1 ? end : end - 1, price: found.price }
            console.log('pushing', inter)
            minIntervals.push(inter)
            start = end
        }
        i++
    }
    return minIntervals;
}

const mergeSamePriceWhenNoGaps = (intervals: Interval[]): Interval[] => {
    console.log('merge intervals', intervals)
    const len = intervals.length
    const merged = []
    let start = intervals[0].start
    for (let i = 1; i < intervals.length; i++) {
        const [prevPrice, price] = [intervals[i - 1].price, intervals[i].price]
        const isLast = i === len - 1;
        if (prevPrice !== price || isLast) {
            const mergedInterval = new Interval(
                start,
                isLast ? intervals[i].end : intervals[i].start - 1,
                prevPrice)
            merged.push(mergedInterval);
            start = intervals[i].start - 1
        }
    }
    return merged
}

// ASSERTIONS
const sampleInput = [new Interval(1, 5, 20), new Interval(3, 8, 15), new Interval(7, 10, 8)];
const expectedOutput = [new Interval(1, 2, 20), new Interval(3, 6, 15), new Interval(7, 10, 8)];
const least = leastPrices(sampleInput)
const merged = mergeSamePriceWhenNoGaps(least)
console.log(least, merged)
