/**
 * Find path to maximize the total prizes you can collect starting from (x, y) in a grid.
 * You can move 1 step either RIGHT or UP per move.
 */

interface Cell { x: number; y: number; };

type Board = number[][];

const enum PathFrom {
    None = 'None',
    Left = 'Left',
    Down = 'Down'
}

interface CumulCell {
    cumul: number;
    path: PathFrom; // the predecessor cell
}

type CumulBoard = CumulCell[][];

/**
 * Returns the Right and Top cells of curr.
 */
const getRightAndTop = (boardX: number, cell: Readonly<Cell>): Cell[] => {
    const adjacents = []; // right and up
    // Right
    if (cell.x < boardX - 1) {
        adjacents.push({ x: cell.x + 1, y: cell.y });
    }
    // Up
    if (cell.y > 0) {
        adjacents.push({ x: cell.x, y: cell.y - 1 });
    }
    return adjacents;
}

const initialiCumulBoard = (xSize: number, ySize: number): CumulBoard => {
    const board: CumulBoard = [];
    for (let i = 0; i < ySize; i++) {
        const cells: CumulCell[] = [];
        for (let j = 0; j < xSize; j++) {
            cells.push({ cumul: 0, path: PathFrom.None });
        }
        board.push(cells);
    }
    return board;
}

const prettyCell = (c: Cell) => `(${c.x}, ${c.y})`;


/**
 * Intuition: CR, the cumulative reward at a cell, is its reward  R + max of the Down and Left cells' cumulatives:
 * 
 *      CR(x, y) = R(x,y) + Max(CR(down), CR(left))
 * 
 * Example: Say nodes A, B, C, D have rewards 1, 2, 3, and 5 respectively:
 * 
 *          C:3   D:5   
 *          A:1   B:2
 *
 *          CR(A) = 1 + max(Reward(down), Reward(left))
 *                = 1 + max(0, 0) = 1 // down and up are outside the BOARD, hence both 0
 *          CR(B) = 2 + max(1, 0) = 3
 *          CR(C) = 3 + max(1, 0) = 4
 * 
 *          We can now calculate the CR(D) = 5 + max(4, 3) = 9
 *          to produce this state:
 * 
 *          {id: C, reward: 3, cumul: 4}------- {id: D, reward: 5, cuml: 9}
 *                                                |
 *                                                |
 *                                     {id: B, reward: 2, cumul:3} 
 */
const bfs = (
    board: Readonly<Board>,
    boardX: Readonly<number>, // size x
    boardY: Readonly<number>, // size y
    start: Readonly<Cell> // starting cell
): CumulBoard => {
    const scoreBoard: CumulBoard = initialiCumulBoard(boardX, boardY);
    const q = [start];

    /**
     * Visits a cell and accumulates reward.
     */
    const visit = (c: Cell) => {
        const leftCumul = c.x > 0 ? (scoreBoard[c.y][c.x - 1]).cumul : 0;
        const downCumul = c.y < boardY - 1 ? (scoreBoard[c.y + 1][c.x]).cumul : 0;
        const cellReward = board[c.y][c.x];
        scoreBoard[c.y][c.x].cumul = cellReward + (leftCumul > downCumul ? leftCumul : downCumul);
        scoreBoard[c.y][c.x].path = leftCumul > downCumul ? PathFrom.Left : PathFrom.Down;

        console.log(`visit: ${prettyCell(c)}, reward: ${cellReward}, MAX(leftCumul: ${leftCumul}, downCumul: ${downCumul}) -> cumul: ${scoreBoard[c.y][c.x].cumul}`);
    };

    while (q.length > 0) {
        const cell: Cell = q.shift() as Cell; // dequeu
        const adjList = getRightAndTop(boardX, cell);
        console.log(`adj-list ${prettyCell(cell)} ->  ${adjList.map(x => prettyCell(x))}`);
        visit(cell);
        adjList.forEach(a => {
            visit(a);
            // enque right and top
            getRightAndTop(boardX, a).forEach(rOrL => q.push(rOrL));
        });
    }

    return scoreBoard;
}


/**
 * Tests
 */
// console.log(zeroFillBoard(3, 4));
const BOARD: Board = [
    [3, 5],
    [7, 2]
];
const START = { x: 0, y: BOARD.length - 1 };
console.log(`MAXIMIZE REWARD\n board: ${JSON.stringify(BOARD)}, start: ${prettyCell(START)}`);
const scores = bfs(BOARD, BOARD[0].length, BOARD.length, START);
console.log('SCORES', scores);
// todo pretty print the path
