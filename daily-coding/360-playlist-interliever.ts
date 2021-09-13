/**
 *          360 - PLAYLIST INTERLIEVER
 */

interface SongNode { song: number, priority: number }

class SimplePriorityQ {
    q: SongNode[] = [];

    push(node: SongNode) {
        this.q.push(node);
        this.q.sort((a, b) => b.priority - a.priority);
        return this;
    }
}

const interleave = (prefs): number[] {
    return []
}

/**
 * ASSERTIONS
 */
const pq = new SimplePriorityQ().push({song: 2, priority: 1}).push({song: 1, priority: 20})
console.log(pq.q.map(n=>n.song).join(',') === '1,2');

const PREFERENCES = [
    [1, 7, 3],
    [2, 1, 6, 7, 9],
    [3, 9, 5]
];

interleave(PREFERENCES).joing(',') === '[2,1,3,7,9,6,5]`
