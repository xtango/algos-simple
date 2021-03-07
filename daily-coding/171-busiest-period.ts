/**
 *                      #171 [Easy] - BUSIEST PERIOD
 *
 * This problem was asked by Amazon.
 *
 * You are given a list of data entries that represent entries and exits of groups of people into a building. An entry looks like this:
 * {"timestamp": 1526579928, count: 3, "type": "enter"}
 * This means 3 people entered the building. An exit looks like this:
 * {"timestamp": 1526580382, count: 2, "type": "exit"}
 * This means that 2 people exited the building. timestamp is in Unix time.
 * Find the busiest period in the building, that is, the time with the most people in the building. 
 * Return it as a pair of (start, end) timestamps. You can assume the building always starts off and ends up empty, i.e. with 0 people inside.
 */

/**
 *                                               ------   
 *              ------------------                       
 *                                ---------------     
 *                                                     
 *         |----|-----------------|-------------|------|-------->
 *         t0  t1                t2            t3     t4   
 */
interface BuildingEvent { timestamp: number, count: number, eventType: 'enter' | 'exit' }

const busiest = (events: BuildingEvent[]): number[] => {
    let [count, maxCount, maxStart, maxEnd] = [0, 0, 0, 0];

    events.sort((a, b) => a.timestamp - b.timestamp);
    events.forEach(ev => {
        count += (ev.eventType === 'enter' ? 1 : -1) * ev.count;
        if (count > maxCount) { // New peak
            maxStart = ev.timestamp;
            maxEnd = Number.POSITIVE_INFINITY
        } else {
            if (maxEnd === Number.POSITIVE_INFINITY) {
                maxEnd = ev.timestamp;
            }
        }
    })
    return [maxStart, maxEnd];
}

/**
 * ASSERTIONS
 */
// unsorted order
console.log(
    JSON.stringify(busiest([
        { timestamp: 1526580382, count: 2, eventType: "exit" },
        { timestamp: 1526579928, count: 3, eventType: "enter" },
        { timestamp: 1526589098, count: 10, eventType: "enter" },
        { timestamp: 1526600000, count: 11, eventType: "exit" }
    ])) === '[1526589098,1526600000]');
