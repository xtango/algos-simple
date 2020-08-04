/**
 * Shortest path between Start and Destination using a breadth-first-search.
 * The path can be traversed if a cell's value is 1.
 * Uses memoization for improved performance.
 */
interface Coordinate { r: number; c: number };
type QNode = Coordinate & { path: Coordinate[] };

/**
 * Returns a ROWS x COLS matrix filled with false
 */
const falseFill = (rows: number, cols: number) => new Array(rows).fill().map(x => new Array(cols).fill(false));

/**
 * To compute the neighbors of a cell: top, right, bottom, left
 */
const NEIGHBOR_OFFSETS = {
    ROW: [-1, 0, 1, 0],
    COL: [0,  1, 0, -1]
};

/**
 * Returns true when position is inside the maze.
 */
const withinBounds = (maxRows: number, maxCols: number, pos: Coordinate) =>
    pos.r >= 0 &&
    pos.r < maxRows &&
    pos.c >= 0
    && pos.c < maxCols;

/**
 * Returns the shortest path through the maze from the start to destination.
 * Traverses breath first.
 */
const bfs = (
    maze: number[][],
    rows: number,
    cols: number,
    start: Coordinate,
    dest: Coordinate): Coordinate[] => {

    // Returns true if not blocked
    const hasWay = (pos: Coordinate) => maze[pos.r][pos.c] === 1;

    // For memoization
    const visited = falseFill(rows, cols);

    // Mark start cell as visited
     visited[start.r][start.c] = true; 

    // Enqueue start cell
    const q: QNode[] = [
        {
            r: start.r,
            c: start.c,
            path: [{ r: start.r, c: start.c }]
        }]; 

    // BFS
    while (q.length) {
        const curr: QNode = q.shift(); // Dequeue head

        // Reached destination?
        if (curr.r === dest.r && curr.c == dest.c) {
            return curr.path;
        }

        //console.log('Curr: ', curr);

        // Enqueue 4 adjacent cells
        for (let i = 0; i < 4; i++) {
            const adj = {
                r: curr.r + NEIGHBOR_OFFSETS.ROW[i],
                c: curr.c + NEIGHBOR_OFFSETS.COL[i]
            };
            // console.log('i, adj: ', i, adj);

            // Enqueue and mark visited when
            // within bounds, has-way, & not visited yet
            if (withinBounds(rows, cols, adj) && hasWay(adj) && !visited[adj.r][adj.c]) {
                q.push(
                    {
                        r: adj.r,
                        c: adj.c,
                        path: [...curr.path, { r: adj.r, c: adj.c }]
                    }
                );
                visited[adj.r][adj.c] = true;
            }
        }
    }

    return undefined; // No path found
}

/**
 * Tests
 */
const test1 = () => {
    const m1 =
        [[1, 0, 1],
        [1, 0, 1],
        [1, 1, 1]];
    const minPath = bfs(m1, 3, 3, { r: 0, c: 0 }, { r: 0, c: 2 });
    console.log('Test 1: maze, minPath: ',
        m1,
        minPath,
        minPath.length === 7 ? 'Passed' : 'Failed');
}

const test2 = () => {
    const m =
        [[0, 0, 0, 0],
        [1, 0, 0, 1],
        [1, 1, 1, 1],
        [1, 1, 1, 1]];
    const minPath = bfs(m, 4, 4, { r: 1, c: 0 }, { r: 1, c: 3 });
    console.log('Test 2: maze, minPath',
        m,
        minPath,
        minPath.length === 6 ? 'Passed' : 'Failed');
}

const test3 = () => {
    const m =
        [[1, 1, 0, 0],
         [1, 0, 1, 1],
         [1, 1, 0, 1],
         [1, 1, 1, 1]];
    const minPath = bfs(m, 4, 4, { r: 0, c: 1 }, { r: 1, c: 2 });
    console.log('Test3: maze, minPath',
        m,
        minPath,
        minPath.length === 11 ? 'Passed' : 'Failed');
}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
test1();
test2();
test3();
