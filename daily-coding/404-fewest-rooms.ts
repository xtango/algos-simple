/**
 *                      Problem #404 [Easy] - FEWEST ROOMS NEED
 * 
 * This problem was asked by Snapchat.
 * 
 * Given an array of time intervals (start, end) for classroom lectures (possibly overlapping),
 * find the minimum number of rooms required.
 * 
 * For example, given [(30, 75), (0, 50), (60, 150)], you should return 2.
 */

const sortByStartTime = (intervals: number[][]) => [...intervals].sort((a, b) => a[0] - b[0]);

/**
 * In-place push of interval. Keeps q sorted by End Time.
 */
const priorityQPush = (q: number[][], interval: number[]) => {
    q.push(interval);
    q.sort((a, b) => a[1] - b[1]);
}

/**
 * Returns the min num of rooms needed. Apporach: first sorting by Start Time
 * and keeping a q sorted by earliest end time. If cannot overlap with the 
 * earliest end time, allocate another room.
 * 
 * After sorting:
 *  [0, 50]     |=====                      Room 1
 *  [30, 75],   |   =======                 Room 2
 *  [60, 150]   |        =============      Room 1
 *              -------------------------------> time
 */
const minRooms = (intervals: number[][]): number => {
    const startTimeSorted = sortByStartTime(intervals);
    let roomsNeeded = 1;
    // Priority Q of rooms that are currently in use, kept sorted by end time.
    // i.e. the head is the room that will be freed up first
    let roomsInUseQ: number[][] = [startTimeSorted[0]];

    for (let i = 1; i < startTimeSorted.length; i++) {
        let roomFound = false;
        while (!roomFound) {
            const earliestEnd = roomsInUseQ[0][1];
            const current = startTimeSorted[i];
            // Does current start overlap with the earliest-ending room in use?
            if (current[0] < earliestEnd) {
                roomsNeeded++;
                priorityQPush(roomsInUseQ, current);
            } else {
                // No overlap. Use it.
                const removed = roomsInUseQ.shift();  // pop head
                // Push old start, new end
                const newStart = removed ? removed[0] : current[0];
                const newEnd = current[1];
                priorityQPush(q, [newStart, newEnd]);
            }
        }
        const [start, prevEnd] = [intervals[i][0], intervals[i - 1][1]]
        if (start < prevEnd) { // is overlapping
            roomsNeeded++;
        }
    }

    return roomsNeeded;
}

/**
 * ASSERTIONS
 */
console.log(minRooms([
    [30, 75],
    [0, 50],
    [60, 150]]) === 2)
