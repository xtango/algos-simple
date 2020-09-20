/**
 * Breadth first traversal
 */
interface Edge {
    name: string;
    adj: number[]; // adjacency list
}
type Graph = Edge[];

/**
 * Returns the breadth-first traversal path
 */
const bfs = (g: Graph, v: number): number[] => {
    const visited: boolean[] = [];
    const path: number[] = [];  // visitation order

    const visit = (i: number) => {
        visited[i] = true;
        path.push(i);
    }

    const q: number[] = [v];
    while (q.length > 0) {
        const head: number = q.shift() as number; // dequeue
        if (!visited[head]) {
            visit(head);
            (g[head].adj || []).forEach(i => q.push(i)); // enqueue
            console.log('q=', q);
        }
    }
    return path;
}

/**
 * Test
 */
const AIRPORTS: Graph = [
    /* 0 */ { name: 'BOS', adj: [1, 2] },
    /* 1 */ { name: 'JFK', adj: [4, 3, 2] },
    /* 2 */ { name: 'HKG', adj: [] },
    /* 3 */ { name: 'TOK', adj: [2] },
    /* 4 */ { name: 'LAX', adj: [5] },
    /* 4 */ { name: 'ICN', adj: [1] }
];
console.log('bfs path: ', bfs(AIRPORTS, 5).map(a => AIRPORTS[a].name));
