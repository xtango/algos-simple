/**
 * Shortest path between Source and Destination
 * using a breadth-first-search. The path can
 * be traversed if a cell's value is 1.
 */

interface Coordinate { r: number; c: number };
type QNode = Coordinate & { dist: number };

const COL = 3;
const ROW = 3;

// Returns a ROW x COL matrix filled with false
const zeroFill = () => new Array(ROW).fill().map(x => new Array(COL).fill(false));

// To compute the neighbors of a cell
const ADJACENT_INDEX = {
    // top, left, right, bottom
    ROW: [-1, 0, 0, 1],
    COL: [0, -1, 1, 0]
};

const withinBounds = (pos: Coordinate) =>
    pos.r >= 0 &&
    pos.r < ROW &&
    pos.c >= 0
    && pos.c < COL;

const bfs = (maze: number[][], start: Coordinate, dest: Coordinate): number {
    const hasWay = (pos: Coordinate) => maze[pos.r][pos.c] === 1;
    const visited = zeroFill();

    // Mark start cell as visited
     visited[start.r][start.c] = true; 

    // Enqueue source
    const q: QNode[] = [{ r: start.r, c: start.c, dist: 0 }]; 

    // BFS
    while (q.length) {
        const curr: QNode = q.shift(); // Dequeue head

        // Reached destination?
        if (curr.r === dest.r && curr.c == dest.c) {
            return curr.dist;
        }

        // Enqueue 4 adjacent cells
        for (let i = 0; i < 4; i++) {
            const adj = {
                r: curr.r + ADJACENT_INDEX.ROW[i],
                c: curr.c + ADJACENT_INDEX.COL[i]
            };

            // Enqueue and mark visited when within bounds, has way, not visited yet
            if (withinBounds(adj) && hasWay(adj) && !visited[adj.r][adj.c]) {
                q.push({ r: adj.r, c: adj.c, dist: curr.dist + 1 });
                visited[adj.r][adj.c] = true;
                console.log('>>> enqueueing: q', [...q]);
            }

            console.log('curr: ', curr);
            console.log('Adj i: ', i, adj);
            console.log('withinBounds, hasWay, hasVisited qAfter',
                withinBounds(adj),
                withinBounds(adj) ? hasWay(adj) : 'N/A',
                withinBounds(adj) ? visited[adj.r][adj.c] : 'N/A',
                [...q]
            );
        }
    }

    return -1; // No path found
}

/**
 * Test
 */
const m1 =
    [[1, 0, 1],
     [1, 0, 1],
     [1, 1, 1]];

console.log(zeroFill());            
console.log(bfs(m1, { r: 0, c: 0 }, { r: 0, c: 2 }) === 6 ? 'Passed': 'Failed');
