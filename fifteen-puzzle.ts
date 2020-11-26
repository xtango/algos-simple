/**
 * FIFTEEN PUZZLE SOLVER
 */
type Grid = number[][];

interface State {
    grid: Grid
    cost: number;
}

interface Coord { y: number; x: number }

const COORD_DELTA = {
    up: { y: -1, x: 0 },
    down: { y: 1, x: 0 },
    right: { y: 0, x: 1 },
    left: { y: 1, x: -1 }
}

type Neighbor = 'up' | 'down' | 'right' | 'left';

const padNum = (num: number) => num.toString().padStart(3, ' ');

const prettyRow = (row: number[]) => row.map(x => x === 0 ? ' __' : padNum(x)).join('');

const prettyState = (s: State) => '\n' + s.grid.map(r => prettyRow(r)).join('\n') + ` -> Cost: ${s.cost}`;

/**
 * Desired state.  0 Represents empty cell.
 */
const GOAL = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 0],
];

/**
 * Costing func. The number of out-of-place numbers.
 */
const cost = (g: Grid): number => {
    let cost = 0;
    for (let y = 0; y < g.length; y++) {
        for (let x = 0; x < g.length; x++) {
            cost += g[y][x] !== GOAL[y][x] ? 1 : 0;
        }
    }
    return cost;
}

/**
 * The coordinate of the empty cell
 */
const emptyCell = (g: Grid): Coord => {
    for (let y = 0; y < g.length; y++) {
        for (let x = 0; x < g.length; x++) {
            if (g[y][x] === 0) {
                return { x, y }; // Found
            }
        }
    }
    return { x: -1, y: -1 } // Not found -> error
}

const cloneGrid = (g: Grid): Grid => g.map(r => [...r])

const isPosInBounds = (g: Grid, pos: Coord): boolean =>
    pos.y > -1
    && pos.y < g.length
    && pos.x > -1
    && pos.x < g.length;

const inBounds = (g: Grid, emptyPos: Coord, neighbor: Neighbor): boolean =>
    isPosInBounds(g,
        {
            y: emptyPos.y + COORD_DELTA[neighbor].y,
            x: emptyPos.x + COORD_DELTA[neighbor].x
        });


/**
 * Moves neighbor 'from' into an empty cell specified by 'to'
 */
const move = (g: Grid, from: Coord, to: Coord): Grid => {
    const clone = cloneGrid(g);
    clone[to.y][to.x] = g[from.y][from.x];
    clone[from.y][from.x] = 0;
    return clone;
}

/**
 * Returns the valid states from state g;
 * @example nextStates(g) where g is:
 * 11 12   
 * 14 __
 * 
 * returns these states
 * 11 12    11 __       
 * __ 14    14 12
 */
const nextStates = (g: Grid): Grid[] => {
    const emptyPos = emptyCell(g);

    Object.keys(COORD_DELTA).map(neighbor => {
        

    });
}

/**
 * BFS
 */
const bfs = (g: Grid) => {


}

/**
 * Assertions
 */
const PUZZLE_1 = [
    [1, 2, 4, 3],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 0]];
console.log(cost(GOAL) === 0);
console.log(prettyState({ grid: PUZZLE_1, cost: 2 }));
console.log(cost(PUZZLE_1) === 2);
console.log([emptyCell(PUZZLE_1).y, emptyCell(PUZZLE_1).x].join(',') === '3,3');
console.log(move(PUZZLE_1, {y: 3, x: 2}, { y: 3, x: 3})[3][3] == 15);
console.log(move(PUZZLE_1, {y: 3, x: 2}, { y: 3, x: 3})[3][2] == 0);
