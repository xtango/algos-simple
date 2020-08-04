/**
 * Shortest path between Source and Destination
 * using a breadth-first-search. The path can
 * be traversed if a cell's value is 1.
 */

interface Coordinate { r: number; c: number };
type QNode = Coordinate & { dist: number };

const COL = 3;
const ROW = 3;

const zeroFill = () => new Array(ROW).fill(new Array(COL).fill(0));

// To compute the neighbors of a cell
const ADJACENT_INDEX = {
    // top, left, right, bottom
    ROW: [-1, 0, 0, 1],
    COL: [0, -1, 1, 0]
};

const withinBounds = (pos: Coordinate) {
    return pos.r >= 0 && pos.r < ROW && pos.c >= 0 && pos.c < COL;
}


const bfs = (maze: number[][], start: Coordinate, dest: Coordinate) {
    

    const visited = zeroFill();

    // Mark start cell as visited
    visited[start.y][start.x] = true; 

    const q: QNode[] = [{ r: start.r, c: start.c, dist: 0 }]; // Enqueue source

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
            if (withinBounds(adj) &&
                // Not blocked 
                maze[adj.r][adj.c] === 1 &&
                // Not yet visited
                !visited[adj.r][adj.c] 
            ) {
                q.push({ r: adj.r, c: adj.c, dist: curr.dist + 1 });
                visited[adj.r][adj.c] = true;
            }
        }
    }
}

/**
 * Test
 */
const m1 =
    [[1, 0, 1],
    [1, 0, 1],
    [1, 1, 1]];
    
            
bfs(m1, { y: 0, x: 0 }, { y: 0, x: 2 });
