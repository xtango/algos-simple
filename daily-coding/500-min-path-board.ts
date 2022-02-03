/**
 * Problem #500 [Easy]
 * This problem was asked by Google.
 * 
 * You are given an M by N matrix consisting of booleans that represents a board.
 *  Each True boolean represents a wall. Each False boolean represents a tile you can walk on.

Given this matrix, a start coordinate, and an end coordinate, return the minimum number of steps
required to reach the end coordinate from the start. If there is no possible path, then return null.
You can move up, left, down, and right. You cannot move through walls. You cannot wrap around the edges of the board.

For example, given the following board:

[[f, f, f, f],
[t, t, f, t],
[f, f, f, f],
[f, f, f, f]]
and start = (3, 0) (bottom left) and end = (0, 0) (top left), the minimum number of steps required 
to reach the end is 7, since we would need to go through (1, 2) because there is a wall everywhere else on the second row.
*/

const OFFSETS = [
    [0, -1], // left
    [-1, 0], // top
    [0, 1], // right
    [1, 0]]; // bottom

const newVisitedBoard = (n: number) => {
    const rows = new Array(n);
    for (let i = 0; i < rows.length; i++) {
        rows[i] = new Array(n).fill(false);
    }
    return rows;
}

interface QElem { cell: number[], distance: number }

const minSteps = (board: number[][], start: number[], end: number[]): number => {
    const visited = newVisitedBoard(board.length);

    const canMove = (y: number, x: number): boolean => {
        return y >= 0 && y < board.length && x >= 0 && x < board.length
            // Not a wall
            && board[y][x] === 0
            // Not seen yet
            && !visited[y][x];
    }

    const getNeighbors = (y: number, x: number) => OFFSETS
        .map(offset => [y + offset[0], x + offset[1]])
        .filter(cell => canMove(cell[0], cell[1]));

    const reachedEnd = (y: number, x: number): boolean => y === end[0] && x === end[1];

    // Iterative breadth first. Traverses one cell at a time on all paths. When we hit the end 
    // we've have the shortest path.
    const bfs = (): number => {
        const q: QElem[] = [];
        q.push({ cell: start, distance: 0 });

        while (q.length) {
            // pop head
            const head = q.shift();
            if (head) {
                const neighbors = getNeighbors(head.cell[0], head.cell[1]);
                for (const [y, x] of neighbors) {
                    if (reachedEnd(y, x)) {
                        return head.distance;
                    }
                    visited[y][x] = true;
                    q.push({ cell: [y, x], distance: head.distance + 1 })
                }
            }
        }
        
        return -1;
    }
    return bfs();
}

const BOARD_0 = [
    [0, 0, 0, 0],
    [1, 1, 0, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0]];

console.log(minSteps(BOARD_0, [3, 0], [0, 0]));
//console.log(newVisitedBoard(3))
