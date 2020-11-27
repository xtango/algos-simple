/**
 *                                  FIFTEEN PUZZLE SOLVER
 * 
 *      A 3x3 example:
 * 
 *      1  3           1     3        1  2  3        1  2  3        1  2  3
 *      4  2  5   =>   4  2  5   =>   4     5   =>   4  5      =>   4  5  6
 *      7  8  6        7  8  6        7  8  6        7  8  6        7  8 
 *      Initial                                                     Goal
 * 
 * METHODOLOGY
 * A* Search. To solve the puzzle from a given state we use a priority queue.
 * The total number of moves we need to make (including those already made) is at least its cost, 
 * using either the Hamming or Manhattan costing function. 
 * 
 * BASIC BUILDING BLOCKS
 * - State:     The grid, its cost and its previous state.
 * - Coster:    To determine the cost of a state
 * - Queue:     A priority queue to help explore states in order of lowest cost.
 * - Solver:    A* Search func that uses all of the above.
 */


/**
 * Grid Related
 */
type Grid = number[][];

interface GridCoord { y: number; x: number }

const GRID_DELTAS = [
    { y: -1, x: 0 },    // above
    { y: 1, x: 0 },     // below
    { y: 0, x: 1 },     // right
    { y: 0, x: -1 }];   // left

class GridUtil {
    /**
     * Returns a grid with the goal state for a NxN puzzle.
     */
    static gridMakeGoal(N: number): Grid {
        const goal: number[][] = Array(N);
        let iter = 1;
        for (let y = 0; y < N; y++) {
            goal[y] = Array(N);
            for (let x = 0; x < N; x++) {
                goal[y][x] = iter++;
            }
        }
        goal[N - 1][N - 1] = 0; // Empty cell
        return goal;
    }

    static gridClone(g: Grid): Grid {
        return g.map(r => [...r]);
    }

    static isInBounds(g: Grid, pos: GridCoord): boolean {
        return pos.y > -1 && pos.y < g.length
            && pos.x > -1 && pos.x < g.length;
    }

    /**
     * Returns a new Grid in which cell 'from' -> 'to' (the empty cell).
     * The original 'g' is left intact.
     */
    static move(g: Grid, from: GridCoord, to: GridCoord): Grid {
        const clone = GridUtil.gridClone(g);
        clone[to.y][to.x] = g[from.y][from.x];
        clone[from.y][from.x] = 0;
        return clone;
    }
}


/**
 * Models the board containing the grid of NxN cells.
 */
class State {
    cost: number;
    emptyCell: GridCoord; // The location of the ZERO cell
    goal: Grid;

    constructor(readonly grid: Grid) {
        this.emptyCell = this.getEmptyCellCoord();
        this.goal = GridUtil.gridMakeGoal(grid.length);
        this.cost = Coster.hamming(this.grid, this.goal);
    }

    pretty() {
        const padNum = (num: number) => num.toString().padStart(3, ' ');

        const prettyRow = (row: number[]) =>
            '|' + row.map(x => x === 0 ? ' __' : padNum(x)).join('')
            + ' |';
        return '\n' + this.grid.map(r => prettyRow(r)).join('\n') + `\n Cost: ${this.cost}`
    }

    /**
     * The coordinate of the empty cell
     */
    private getEmptyCellCoord(): GridCoord {
        for (let y = 0; y < this.grid.length; y++) {
            for (let x = 0; x < this.grid.length; x++) {
                if (this.grid[y][x] === 0) {
                    return { x, y }; // Found
                }
            }
        }
        return { x: -1, y: -1 } // Not found -> error
    }

    /**
     * Returns the valid states from the current state.
     * 
     * @example nextStates() where current is:
     *              |11 12|
     *              |14 __|
     *          returns 2 states:
     *              |11 12| and |11 __|
     *              |__ 14|     |14 12|
     */
    nextStates(): State[] {
        const validStates = GRID_DELTAS.reduce((accum: State[], delta: GridCoord) => {
            const from = { y: this.emptyCell.y + delta.y, x: this.emptyCell.x + delta.x };
            if (GridUtil.isInBounds(this.grid, from)) {
                const newGrid = GridUtil.move(this.grid, from, this.emptyCell);
                const nextState = new State(newGrid);
                return accum.concat(nextState);
            } else {
                return accum;
            }
        }, []);
        return validStates;
    }

    /** 
     * Used to keep track of visited.
     */
    get hashKey(): string {
        return this.grid.map(r => r.join('_')).join('');
    }
}


class Solver {
    /**
     * A* BEST-first-search to reach the "goal" state.
     * We define a state of the game to be the board position, 
     * the number of moves made to reach the board position, and the previous state.
     *
     * First, insert the initial state (the initial board, 0 moves, and a null previous state)
     * into a priority queue. Then, delete from the priority queue the state with the minimum 
     * priority, and insert onto the priority queue all neighboring states (those that can be
     * reached in one move). Repeat this procedure until the state dequeued is the goal state. 
     * The success of this approach hinges on the choice of priority function for a state.
     * 
     * We consider two priority functions, Hamming and Manhattan (WIP), below.
     */
    static bestFirstSearch = (state: State, maxIter = 10): boolean  {
        // Hash of states that have already been explored
        const visited: { [key: string]: number } = {};

        if (state.cost === 0) return true;

        // Queue the next valid states in order of lowest cost
        const q = new Q([state]);

        let iter = 0;
        while (!q.isEmpty() && iter < maxIter) {
            // Visit
            const state = q.dequeue();
            visited[state.hashKey] = 1;
            console.log(`${'-'.repeat(10)} Iteration: ${iter} ${'-'.repeat(10)}`);
            console.log(`[visiting] ${state.pretty()}`)

            if (state.cost === 0) {
                return true; // found
            } else {
                const nextList = state.nextStates();
                console.log('---> next valid states', nextList.map(x => x.pretty()));
                const nextListFiltered = nextList.filter(x => !visited[x.hashKey]);

                // todo: 
                // A critical optimization. You will notice that states corresponding 
                // to the same board position are enqueued on the priority queue many times.
                // To prevent unnecessary exploration of useless states, when considering the 
                // neighbors of a state, don't enqueue the neighbor if its board position 
                // is the same as the previous state.
                if (nextList.length > 0) {
                    q.enqueueMulti(nextListFiltered)
                }
            }

            iter++;
        }
        return false;
    }
}

class Coster {
    /**
     * HAMMING priority function. The number of cells in the wrong position, plus the number
     * of moves made so far to get to the state. Intutively, a state with a small number of
     * blocks in the wrong position is close to the goal state, and we prefer a state that have
     * been reached using a small number of moves.
     */
    static hamming(g: Grid, goal: Grid): number {
        let cost = 0;
        for (let y = 0; y < g.length; y++) {
            for (let x = 0; x < g.length; x++) {
                cost += (g[y][x] !== goal[y][x]) ? 1 : 0;
            }
        }
        return cost;
    }

    /** 
     * Manhattan priority function. The sum of the distances (sum of the vertical and horizontal
     * distance) from the blocks to their goal positions, plus the number of moves made so far
     * to get to the state.
     *
     * TODO: WIP     
     */
    static manhattan(): number {
        return -1
    }
}

/**
 * Priority queue to help explore LOWEST cost states first.
 * @see hamming and manhattan
 */
class Q {
    prioritized: State[]

    constructor(readonly states: State[]) {
        this.prioritized = [];
        states.forEach(s => this.enqueue(s));
    }

    enqueue(s: State) {
        this.prioritized.push(s);
        this.prioritized.sort((a, b) => a.cost - b.cost);
    }

    enqueueMulti(s: State[]) {
        s.forEach(s => this.enqueue(s));
        console.log(`[after enqueue] -> ${this.pretty()}`);
    }

    dequeue(): State {
        const state = this.prioritized.shift() as State;
        return state;
    }

    isEmpty(): boolean {
        return this.prioritized.length === 0;
    }

    len(): number {
        return this.prioritized.length;
    }

    pretty(): string {
        const grids = this.prioritized.map(s => s.pretty()).join('\n');
        return `QLen: ${this.prioritized.length}${grids}`;
    }
}


/**
 * Assertions
 */

/**
 * Desired state, where 0 represents the empty cell.
 */
const GOAL_2x2: Grid = [
    [1, 2],
    [3, 0]];

const GOAL_4x4: Grid = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 0],
];

/**
 * Puzzles test cases, ordered from easy to difficult
 */
const PUZZLE_1: Grid = [
    [1, 2],
    [0, 3]];

const PUZZLE_2: Grid = [
    [1, 2],
    [0, 3]];

const PUZZLE_3: Grid = [
    [0, 1, 3],
    [4, 2, 5],
    [7, 8, 6]];

const PUZZLE_4: Grid = [
    [1, 2, 4, 3],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 0]];

// Test State funcs
console.log('[test cost]', new State(GOAL_2x2).cost === 0);
console.log('[test cost]', new State(GOAL_4x4).cost === 0);
console.log('[test cost]', new State(PUZZLE_1).cost === 2);
console.log('[test find empty]', [new State(PUZZLE_4).emptyCell.y, new State(PUZZLE_4).emptyCell.x].join(',') === '3,3');

// Test Grid utils
console.log('[test move]', GridUtil.move(PUZZLE_4, { y: 3, x: 2 }, { y: 3, x: 3 })[3][3] == 15);
console.log('[test move]', GridUtil.move(PUZZLE_4, { y: 3, x: 2 }, { y: 3, x: 3 })[3][2] == 0);
console.log('[test next]', new State(PUZZLE_4).nextStates().length == 2);

console.log('[test pretty]', new State(GOAL_2x2).pretty());
console.log('[test priority q]', new Q([new State(PUZZLE_1), new State(GOAL_2x2)]).prioritized.length == 2);

// Test the solver
console.log('[test bfs]', Solver.bestFirstSearch(new State(PUZZLE_1));
console.log('[test bfs]', Solver.bestFirstSearch(new State(PUZZLE_2)) ? 'solved' : 'unsolvable');
console.log('[test best first search]', Solver.bestFirstSearch(new State(PUZZLE_3)) ? 'solved' : 'unsolvable');
