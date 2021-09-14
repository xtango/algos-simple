/**
 *              #360 - PLAYLIST INTERLIEVER *** WORK IN PROGRESS **
 * 
 * You have access to ranked lists of songs for various users.
 * Each song is represented as an integer, and more preferred songs appear
 * earlier in each list.
 * 
 * For example, the list [4, 1, 7] indicates that a user likes
 * song 4 the best, followed by songs 1 and 7.
 * 
 * Given a set of these ranked lists, interleave them to create a playlist
 * that satisfieseveryone's priorities. For example, suppose your input is
 *      {[1, 7, 3], [2, 1, 6, 7, 9], [3, 9, 5]}.
 * In this case a satisfactory playlist could be [2, 1, 6, 7, 3, 9, 5].
 */
interface PriorityQNode { id: number, priority: number }
type SongPreference = number[];

/**
 * Simple, non-performant data structure to manage a list of (id, priority)
 * Gives priority to the element with minimum priority value; 
 */
class MinPriorityQ {
    q: PriorityQNode[] = [];

    insert(id: number, priority: number): MinPriorityQ {
        this.q.push({ id, priority });
        this.q.sort((a, b) => a.priority - b.priority); // ascending
        console.log('after insert', id, priority, this.q.map(x=> x.id));
        return this;
    }

    find(id: number): PriorityQNode | undefined {
        return this.q.find(node => node.id === id)
    }

    remove(id: number): MinPriorityQ {
        const idx = this.q.findIndex(node => node.id = id);
        if (idx > -1) {
            this.q.splice(idx, 1);
        }
        return this;
    }

    setPriority(id: number, priority: number): MinPriorityQ {
        return this.remove(id).insert(id, priority);
    }
}

const interleave = (prefs: SongPreference[]): number[] => {
    const q = new MinPriorityQ();
    prefs.forEach((prefList) => {
        let offset = 0
        prefList.forEach((songId, idx) => {
            const found = q.find(songId);
            console.log('finding in q', songId, found);
            if (!found) {
                q.insert(songId, idx + offset);
            } else {
                offset += Math.max(idx, found.priority)
                q.setPriority(songId, idx + offset)
            }
        })
    })
    console.log(q);

    return []
}


/**
 * ASSERTIONS
 */
// Test priority queue
// const pq = new MinPriorityQ().insert(2, 1).insert(1, 20);
// console.log(pq.q.map(n => n.id).join(',') === '1,2');

console.log(interleave([
    [1, 7, 3],
    [2, 1, 6, 7, 9],
    // [3, 9, 5]
]).join(',') === '[2,1,3,7,9,6,5]');
