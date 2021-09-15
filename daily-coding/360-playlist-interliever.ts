/**
 *          360 - PLAYLIST INTERLIEVER
 * 
 * This problem was asked by Spotify.
 * 
 * You have access to ranked lists of songs for various users.
 * Each song is represented as an integer, and more preferred songs appear
 * earlier in each list. For example, the list [4, 1, 7] indicates that a 
 * user likes song 4 the best, followed by songs 1 and 7.
 * 
 * Given a set of these ranked lists, interleave them to create a playlist
 * that satisfieseveryone's priorities.
 * 
 * For example, suppose your input is
 *      {[1, 7, 3], [2, 1, 6, 7, 9], [3, 9, 5]}.
 * In this case a satisfactory playlist could be [2, 1, 6, 7, 3, 9, 5].
 */
interface PriorityQNode { id: number, priority: number }
type SongPreference = number[];

/**
 * Simple, non-performant minium priority queue to manage a list of (id, priority).
 * Gives priority to the element with minimum priority.
 */
class MinPriorityQ {
    q: PriorityQNode[] = [];

    insert(id: number, priority: number): MinPriorityQ {
        this.q.push({ id, priority });
        this.q.sort((a, b) => a.priority - b.priority); // ascending
        console.log(`\tAfter insert ${id}:${priority} -> q: ${this.q.map(x => x.id)}`);
        return this;
    }

    find(id: number): PriorityQNode | undefined {
        return this.q.find(node => node.id === id)
    }

    remove(id: number): MinPriorityQ {
        const idx = this.q.findIndex(node => node.id === id);
        if (idx > -1) {
            this.q.splice(idx, 1);
        }
        return this;
    }

    changePriority(id: number, priority: number): MinPriorityQ {
        return this.remove(id).insert(id, priority);
    }
}

const interleaveSongs = (prefs: SongPreference[]): number[] => {
    const q = new MinPriorityQ();
    // Build priority queue.

    // Step 1:
    // When a song is encountered for the 1st time,
    // add to the q at the priority position. When a song is encountered
    // again (in another playlist), we the offset its priority and any
    // new songs that added to the queue
    prefs.forEach((prefList) => {
        let offset = 0;
        prefList.forEach((songId, idx) => {
            const found = q.find(songId);
            console.log(`Step 1: ${songId} -> ${found ? '' : 'not'} found`);
            if (!found) {
                q.insert(songId, idx + offset);
            } else {
                offset += Math.max(idx, found.priority);
                q.changePriority(songId, idx + offset);
            }
        })
    })

    // Step 2:
    // When encountered AFTER the 1st time, a song is demoted in Step 1 above.
    // Update priorities so that all the songs in the playlist (where the song 
    // was first found) also gets demoted.
    prefs.forEach((prefList) => {
        let offset = 0;
        prefList.forEach((songId, idx) => {
            const found = q.find(songId);
            console.log(`Step 2: ${songId} -> ${found ? '' : 'not'} found`);
            if (found && found.priority > idx) {
                offset = Math.max(offset, found.priority - idx);
            }
            q.changePriority(songId, idx + offset);

        })
    })

    return q.q.map(node => node.id)
}


/**
 * ASSERTIONS
 */
// Test priority queue operations
const pq = new MinPriorityQ().insert(2, 1).insert(1, 20);
console.log(pq.q.map(n => n.id).join(',') === '1,2');

// Test interliever
console.log(
    ['2,1,3,7,9,6,5', '2,1,6,7,3,9,5'] // valid answers
        .includes(
            interleaveSongs([
                [1, 7, 3],
                [2, 1, 6, 7, 9],
                [3, 9, 5]
            ]).join(',')
        ));
