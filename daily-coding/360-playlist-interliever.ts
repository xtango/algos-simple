/**
 *          360 - PLAYLIST INTERLIEVER
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
interface SongNode { songId: number, priority: number }
type SongPreference = number[];

class SimplePriorityQ {
    q: SongNode[] = [];

    push(songId: number, priority: number) {
        this.q.push({ songId, priority });
        this.q.sort((a, b) => b.priority - a.priority);
        return this;
    }

    find(songId: number) {
        return this.q.find(node => node.songId === songId)
    }

    remove(songId: number) {
        const idx = this.q.findIndex(node => node.songId = songId);
        if (idx > -1) {
            this.q.splice(idx, 1);
        }
        return this;
    }

    setPriority(songId: number, priority: number) {
        this.remove(songId).push(songId, priority);
    }
}

const interleave = (prefs: SongPreference[]): number[] => {
    const q = new SimplePriorityQ();
    prefs.forEach((prefList) => {
        let offset = 0
        prefList.forEach((songId, idx) => {
            const found = q.find(songId)
            if (!found) {
                q.push(songId, idx + offset);
            } else {
                const oldPriority = found.priority;
                offset += Math.max(idx, oldPriority)
                q.setPriority(songId, idx + offset)
            }
        })
    })

    return []
}


/**
 * ASSERTIONS
 */
const pq = new SimplePriorityQ().push(2,  1).push(1, 20)
console.log(pq.q.map(n => n.songId).join(',') === '1,2');

const PREFERENCES: SongPreference[] = [
    [1, 7, 3],
    [2, 1, 6, 7, 9],
    [3, 9, 5]
];

console.log(interleave(PREFERENCES).join(',') === '[2,1,3,7,9,6,5]');
