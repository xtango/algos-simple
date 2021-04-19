/**
 *              Shortest Path in Graph
 */

/**
 * Node to connected Node hash map
 */
type Graph = { [id: string]: string[] }

/**
 * Returns a shortest path using a Breath First approach.
 */
const shortest = (graph: Graph, fromId: string, toId: string): string => {
    const q: { id: string, parent: string }[] = [];
    const visited: { [id: string]: boolean } = {}
    const parents: { [id: string]: string } = {}

    const bfs = (id: string, parentId: string = '', depth: number = 0) => {
        if (depth > 10) { // short circuit
            return;
        }
        //console.log('bfs', id);
        parents[id] = parentId;
        if (id === toId) {
            // console.log('found', id);
            return;
        }
        visited[id] = true;

        // Add neighbors to q if not visited
        const neighbors = graph[id];
        if (neighbors) {
            neighbors.forEach(n => {
                if (!visited[n]) {
                    q.push({ id: n, parent: id })
                }
            });
        }
        // Recurse
        while (q.length) {
            const node = q.shift(); // remove 1st elem
            bfs(node.id, node.parent, depth + 1);
        }
    }

    // Driver
    bfs(fromId);

    // Retrace path from backwards, building the path string, e.g. 'a->d->e' 
    let [parent, path] = [parents[toId], toId]
    while (parent) {
        path = parent + '->' + path;
        parent = parents[parent];
    }
    return path;
}

/**
 *  a - b
 *  | \ c - g
 *  d      |  
 *   \ e - f
 * 
 */
const graph1: Graph = {
    'a': ['b', 'c', 'd'],
    'b': ['a'],
    'c': ['a', 'g'],
    'd': ['a', 'e'],
    'e': ['d', 'f'],
    'f': ['e', 'g']
}
/**
 * ASSERTIONS
 */
console.log(shortest(graph1, 'a', 'e') === 'a->d->e');
console.log(shortest(graph1, 'b', 'e') === 'b->a->d->e');
console.log(shortest(graph1, 'e', 'c') === 'e->d->a->c'); // also valid: e->f->g->c
