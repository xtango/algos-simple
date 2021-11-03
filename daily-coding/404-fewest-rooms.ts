/**
 *                      Problem #404 [Easy] - FEWEST ROOMS
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
 * Returns the min num of rooms needed. Approach: sorts by Start Time
 * and keeps a q of rooms in use, sorted by earliest end time. If overlaps with the 
 * earliest room to free up, we allocate another room.
 * 
 * After sorting:
 *  [0, 50]     |=====                      Room 1
 *  [30, 75],   |   =======                 Room 2
 *  [60, 150]   |        =============      Room 1
 *              -------------------------------> time
 */
const minRooms = (intervals: number[][]): number => {
    const startTimeSorted = sortByStartTime(intervals);

    // Priority Q of rooms currently in use, kept sorted by end time.
    // Its head is the room that will free up first.
    let roomsInUseQ: number[][] = [startTimeSorted[0]];

    let roomsNeeded = 1;
    for (let i = 1; i < startTimeSorted.length; i++) {
        const current = startTimeSorted[i];
        const firstToBeFreed = roomsInUseQ[0];
        // Does current start overlap with the earliest-ending room in use?
        if (current[0] < firstToBeFreed[1]) {
            // Overlap, so we'll need another room
            roomsNeeded++;
            priorityQPush(roomsInUseQ, current);
        } else {
            // No overlap. Use it.
            const removed = roomsInUseQ.shift();  // pop head
            // Push old start, new end
            const newStart = removed ? removed[0] : current[0];
            const newEnd = current[1];
            priorityQPush(roomsInUseQ, [newStart, newEnd]);
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
