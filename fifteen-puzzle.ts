/**
 * FIFTEEN PUZZLE SOLVER
 * 
 * Cost base breadth first search to minimize moves to the final goal.
 */
type Grid = number[][];

interface State {
    grid: Grid;
    goal: Grid;
    cost: number;
}

interface Coord { y: number; x: number }

const newState = (grid: Grid, goal: Grid): State => { return { grid: grid, cost: cost(grid, goal), goal: goal } }

/**
 * Priority queue to help explore lowest cost states first.
 */
class Q {
    constructor(readonly states: State[]) { }

    enqueue(s: State) {
        this.states.push(s);
        this.states.sort((a, b) => a.cost - b.cost);
    }

    dequeue(): State | undefined {
        if (this.states.length > 0) {
            return this.states.shift();
        } else return undefined;
    }
}

const COORD_DELTAS = [
    { y: -1, x: 0 },    // above
    { y: 1, x: 0 },     // below
    { y: 0, x: 1 },     // right
    { y: 0, x: -1 }];   // left


type Neighbor = 'up' | 'down' | 'right' | 'left';

const padNum = (num: number) => num.toString().padStart(3, ' ');

const prettyRow = (row: number[]) => row.map(x => x === 0 ? ' __' : padNum(x)).join('');

const prettyState = (s: State) => '\n' + s.grid.map(r => prettyRow(r)).join('\n') + ` -> Cost: ${s.cost}`;

/**
 * Costing func. The number of out-of-place numbers.
 */
const cost = (g: Grid, goal: Grid): number => {
    let cost = 0;
    for (let y = 0; y < g.length; y++) {
        for (let x = 0; x < g.length; x++) {
            cost += (g[y][x] !== 0) && (g[y][x] !== GOAL_4x4[y][x]) ? 1 : 0;
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
    pos.y > -1 && pos.y < g.length
    && pos.x > -1 && pos.x < g.length;

// const inBounds = (g: Grid, emptyPos: Coord, delta: Coord): boolean =>
//     isPosInBounds(g, { y: emptyPos.y + delta.y, x: emptyPos.x + delta.x });

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
 *      11 12   
 *      14 __
 * returns 2 states:
 *  |11 12|  and  |11 __|
 *  |__ 14|       |14 12|
 */
const nextStates = (current: State): State[] => {
    console.log("[next] from ", prettyState(current));
    const empty = emptyCell(current.grid);
    const validStates = COORD_DELTAS.reduce((accum: State[], delta: Coord) => {
        const from = { y: empty.y + delta.y, x: empty.x + delta.x };
        console.log('peeking from: ', from);
        if (isPosInBounds(current.grid, from)) {
            console.log('In bounds');
            const newGrid = move(current.grid, from, empty);
            const nextState = newState(newGrid, current.goal);
            console.log('newState: ', prettyState(nextState));
            return accum.concat(nextState);
        } else {
            return accum;
        }
    }, []);
    return validStates;
}

/**
 * BFS
 */
const bfs = (g: Grid) => {


}

/**
 * Assertions
 */

/**
 * Desired state, where 0 represents the empty cell.
 */
const GOAL_2x2 = [
    [1, 2],
    [3, 0]];

const GOAL_4x4 = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 0],
];

const PUZZLE_1 = [
    [1, 2],
    [, 3]];


const PUZZLE_2 = [
    [1, 2, 4, 3],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 0]];
console.log(cost(GOAL_4x4, GOAL_4x4) === 0);
console.log(prettyState(newState(PUZZLE_2)));
console.log(cost(PUZZLE_2, GOAL_4x4) === 2);
console.log([emptyCell(PUZZLE_2).y, emptyCell(PUZZLE_2).x].join(',') === '3,3');
console.log(move(PUZZLE_2, { y: 3, x: 2 }, { y: 3, x: 3 })[3][3] == 15);
console.log(move(PUZZLE_2, { y: 3, x: 2 }, { y: 3, x: 3 })[3][2] == 0);
console.log('[test next]', nextStates(newState(PUZZLE_2, GOAL_4x4), GOAL_4x4).map(x => prettyState(x)));
