/**
 * Sodoku Solver
 * 
 * 
 */
type Grid = number[][];

const colSlice = (grid: Grid, x: number): number[] => grid.map(r => r[x])

const isColOk = (grid: Grid, x: number, n: number) => colSlice(grid, x).some(el => el === n);

const isRowOk = (grid: Grid, y: number, n: number) => grid[y].some(el => el === n);

const parse = (st: string[]): number[][] => st.map(l => l.split(' ').map(x => Number(x)));

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

const solve = (g: Grid) {

}

/**
 * Tests
 */
const simple = [
    '0 4 0 0 0 0 1 7 9',
    '0 0 2 0 0 8 0 5 4',
    '0 0 6 0 0 5 0 0 8',

    '0 8 0 0 7 0 9 1 0',
    '0 5 0 0 9 0 0 3 0',
    '0 1 9 0 6 0 0 4 0',

    '3 0 0 4 0 0 7 0 0',
    '5 7 0 1 0 0 2 0 0',
    '9 2 8 0 0 0 0 6 0'];

console.log(pretty(parse(simple)));
console.log(colSlice(parse(simple), 3));
