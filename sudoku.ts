/**
 * Sodoku Solver
 * An empty cell is represented by 0.
*/
type Grid = number[][];

type CoordinateYX = number[]; // y, x

const colSlice = (g: Grid, x: number): number[] => g.map(r => r[x])

const isNumOkInCol = (g: Grid, x: number, n: number) => colSlice(g, x).every(el => el !== n);

const isNumOkInRow = (g: Grid, y: number, n: number) => g[y].every(el => el !== n);

const isNumOkInSector = (g: Grid, y: number, x: number, n: number) => true; // todo

const isNumValid = (g: Grid, y: number, x: number, n: number): boolean =>
    isNumOkInCol(g, x, n)
    && isNumOkInRow(g, y, n)
    && isNumOkInSector(g, y, x, n)

const parse = (st: string[]): number[][] => st.map(l => l.split(' ').map(x => Number(x)));

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

const solve = (g: Grid) => {
    let backTrackCount = 0;

    const solveRecur = (g: Grid): boolean => {
        const [y, x] = nextEmpty(g);
        console.log(`[solveRecur] ${y}, ${x}`);

        if (y === -1) {
            return true; // No more empty cells
        }

        // Brute force: try out every valid num
        for (let n = 1; n < 3; n++) {
            if (isNumValid(g, y, x, n)) {
                console.log(`${y} ${x}: Trying ${n}`);
                // Change value for the next grid state
                g[y][x] = n;

                // Recurse with the next grid state
                if (solveRecur(g)) {
                    return true;
                } else {
                    // Ran into a conflict. Let's back back track
                    console.log('...Conflict -> backtracking');
                    g[y][x] = 0;
                    backTrackCount++;
                }
            } else {
                console.log(`${y} ${x}: ${n} invalid. Trying another...`);
            }
             
        }
        return false;
    }

    return solveRecur(g);
}



const pretty = (g: Grid): string => {
    let s = ''
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
 * Tests
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

console.log(SIMPLE[0][1] === 4 ? 'passed' : 'failed');
console.log(colSlice(SIMPLE, 3)[6] === 4 ? 'passed' : 'failed');
console.log(nextEmpty(SIMPLE).join('_') === '0_0' ? 'passed' : 'failed');
solve(SIMPLE);
