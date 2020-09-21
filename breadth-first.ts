/**
 * Breadth first traversal
 */
interface Edge {
    name: string;
    adj: number[]; // adjacency list
}
type Graph = Edge[];
type Path = Edge[];

/**
 * Returns the breadth-first traversal path
 */
const bfs = (g: Graph, v: number): Path => {
    const visited: boolean[] = [];
    const path: Path = [];  // visitation order

    const visit = (i: number) => {
        visited[i] = true;
        path.push(g[i]);

        // Enqueue adjacent edges
        (g[i].adj || []).forEach(i => q.push(i));
        console.log('q=', q);
    }

    const q: number[] = [v];
    while (q.length > 0) {
        const head: number = q.shift() as number; // dequeue
        if (!visited[head]) {
            visit(head);
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
    /* 5 */ { name: 'ICN', adj: [1] }
];

console.log('bfs Passed?',
    bfs(AIRPORTS, 5)
        .map(x => x.name)
        .join(' ') === 'ICN JFK LAX TOK HKG'
);
