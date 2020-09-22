/**
 * Find path to maximize the total prizes you can collect starting from u in a grid.
 * You can move 1 step per move, either right or up.
 */

/**
 * Intuition: The cumulative reward at a cell is its reward R + the max of the down and left cells cumulatives.
 *      CR(x, y) = R(x,y) + Max(CR(down), CR(left))
 * 
 * Example: Say nodes a, b, c, d have rewards 1, 2, 3, 5
 * 
 * Rewards:
 * C:3   D:5   
 * A:1   B:2
 * 
 * CR(A) = 1 + max(Reward(down), Reward(left)) = 1 + max(0, 0) = 0 // down and up are outside the BOARD, hence both 0
 * CR(B) = 2 + max(1, 0) = 3
 * CR(C) = 3 + max(1, 0) = 4
 * 
 * We can now calculate the CR(D) = 5 + max(4, 3) = 9
 *
 * {id: C, reward: 3, cumul: 4}------- {id: D, reward: 5, cuml: 9}
 *                                                |
 *                                                |
 *                                     {id: B, reward: 2, cumul:3} 
 */
interface Cell { x: number; y: number;};

const bfs = (board: number[][], cell: Cell ) => {
    const left = cell.x >= 0 ? board[cell.y][cell.x - 1] : 0;
    const down = cell.y >= 0 ? board[cell.y - 1][cell.x] : 0;

    const q = [cell];
    let i = 0;

    const getAdjacents = (curr: Cell) => {
        const adjacents = []; // right and top
        if (curr.x < board[0].length) {
            adjacents.push({x: curr.x + 1, y: curr.y});
        } 
        if (curr.y < board.length) {
            adjacents.push({x: curr.x, y: curr.y -1 });
        }
        console.log(`adj of (${curr.x}, ${curr.y}):  ${JSON.stringify(adjacents)}`);
        return adjacents;
    }
    
    while(q.length > 0 && i < 2) {
        const curr: Cell = q.shift() as Cell; // deq
        getAdjacents(curr).forEach( a => {
            console.log(`visit: (${curr.x}, ${curr.y}) r: ${board[curr.y][curr.x]}`);
            // todo: set cumulative

            // enque right and left
            getAdjacents(a).forEach(rOrL => q.push(rOrL);
        });

       console.log(`[${i}] q: `, q);
        i++;
    }


}
const BOARD = [
    [9, 0, 6, 1],
    [3, 5, 0, 5],
    [0, 2, 0, 5],
];

bfs(BOARD, {x: 0, y: 2})
