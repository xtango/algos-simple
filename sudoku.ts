/**
 * Sodoku Solver
 * 
 *      "In classic sudoku, the objective is to fill a 9×9 grid with
 *      digits so that each column, each row, and each of the nine 3×3 subgrids that
 *      compose the grid (also called "boxes", "blocks", or "regions") contain all 
 *      of the digits from 1 to 9. The puzzle setter provides a partially completed 
 *      grid, which for a well-posed puzzle has a single solution."
 *                                                              - Wikipedia
 *
 * Approach: Brute force with backtracking. 
 * Limitations: No "implications" are used, hence slow.
 */
type Grid = number[][];

type CoordinateYX = number[]; // y, x

const colSlice = (g: Grid, x: number): number[] => g.map(r => r[x])

const isNumOkInCol = (g: Grid, x: number, n: number) => colSlice(g, x).every(el => el !== n);

const isNumOkInRow = (g: Grid, y: number, n: number) => g[y].every(el => el !== n);

/**
 * Each subgrid should have distinct (no dups) numbers, 1..9
 */
const isNumOkInSubGrid = (g: Grid, y: number, x: number, n: number): boolean => {
    const xOffset = Math.floor(x / 3) * 3;
    const yOffset = Math.floor(y / 3) * 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (g[i + yOffset][j + xOffset] === n) {
                return false;
            }
        }
    }
    return true;
}

const isNumValid = (g: Grid, y: number, x: number, n: number): boolean =>
    isNumOkInCol(g, x, n)
    && isNumOkInRow(g, y, n)
    && isNumOkInSubGrid(g, y, x, n)

const parse = (st: string[]): number[][] => st.map(l => l.split(' ').map(x => Number(x)));

const prettyYXN = (y: number, x: number, n: number): string => `(${y}, ${x}): ${n}`;
/**
 * Returns the y, x tuple of the next empty cell or [-1, -1] when none.
 */
const nextEmpty = (grid: Grid): CoordinateYX => {
    for (let i = 0; i < grid.length; i++) {
        const j = grid[i].findIndex(e => e === 0);
        if (j > -1) {
            return [i, j]
        }
    }
    return [-1, -1];
}

/**
 * Recursive solver that uses backtracking
 */
const solve = (g: Grid, MAX_RECURSION_DEPTH: number = 100) => {

    const solveRecur = (g: Grid, backtrackCount: number = 0, depth: number = 0): boolean => {
        console.log(`[solveRecur] recurDepth: ${depth}, backtrack: ${backtrackCount} ${pretty(g)}`);
        if (depth > MAX_RECURSION_DEPTH) {
            console.log('[solveRecur] Abort: max recur depth reached');
            return true;
        }

        const [y, x] = nextEmpty(g);
        console.log(`[solveRecur] ${prettyYXN(y, x, 0)}`);

        if (y === -1) {
            console.log('SOLVED!');
            return true; // No more empty cells
        }

        // Brute force: try out nums 1..9 in the empty cell
        for (let n = 1; n <= 9; n++) {
            if (isNumValid(g, y, x, n)) {
                console.log(`...${prettyYXN(y, x, n)} -> valid`);
                // Change value for the next grid state
                g[y][x] = n;

                // Recurse using the next grid state
                if (solveRecur(g, backtrackCount, depth + 1)) {
                    return true;
                } else {
                    // A conflict. Let's back track
                    console.log(`...${prettyYXN(y, x, n)} -> conflict backtrack`);
                    g[y][x] = 0; // Change back to 0 (was changed to n, see above)
                    backtrackCount++;
                }
            } else {
                //console.log(`...${prettyYXN(y, x, n)} -> invalid, try another...`);
            }

        }
        return false;
    }

    return solveRecur(g);
}



const pretty = (g: Grid): string => {
    let s = '\n';
    for (let r = 0; r < g.length; r++) {
        s += (r % 3 === 0) ? '-'.repeat(22) + '\n' : ''

        for (let c = 0; c < g.length; c++) {
            s += (c % 3 === 0 && c !== 0) ? '| ' : ''
            s += g[r][c] + ' ';
        }
        s += '\n';
    }
    return s;
}


/**
 * TESTS
 *
 * An empty cell is represented by 0.
 */
const SIMPLE = parse([
    '0 4 0 0 0 0 1 7 9',
    '0 0 2 0 0 8 0 5 4',
    '0 0 6 0 0 5 0 0 8',

    '0 8 0 0 7 0 9 1 0',
    '0 5 0 0 9 0 0 3 0',
    '0 1 9 0 6 0 0 4 0',

    '3 0 0 4 0 0 7 0 0',
    '5 7 0 1 0 0 2 0 0',
    '9 2 8 0 0 0 0 6 0']);

/**
 * A solution to SIMPLE
    [solveRecur] recurDepth: 48, backtrack: 10
    ----------------------
    8 4 5 | 6 3 2 | 1 7 9
    7 3 2 | 9 1 8 | 6 5 4
    1 9 6 | 7 4 5 | 3 2 8
    ----------------------
    6 8 3 | 5 7 4 | 9 1 2
    4 5 7 | 2 9 1 | 8 3 6
    2 1 9 | 8 6 3 | 5 4 7
    ----------------------
    3 6 1 | 4 2 9 | 7 8 5
    5 7 4 | 1 8 6 | 2 9 3
    9 2 8 | 3 5 7 | 4 6 1
*/

console.log(SIMPLE[0][1] === 4 ? 'passed' : 'failed');
console.log(colSlice(SIMPLE, 3)[6] === 4 ? 'passed' : 'failed');
console.log(nextEmpty(SIMPLE).join('_') === '0_0' ? 'passed' : 'failed');
console.log(isNumOkInSubGrid(SIMPLE, 3, 0, 8) === false ? 'passed' : 'failed');
console.log(isNumOkInSubGrid(SIMPLE, 3, 0, 7) === true ? 'passed' : 'failed');

solve(SIMPLE);
