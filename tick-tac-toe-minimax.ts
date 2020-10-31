/**
 * TIC-TAC-TOE - MINIMAX
 * 
 *      "The player who succeeds in placing three of their marks in a horizontal, vertical,
 *      or diagonal row is the winner. It is a solved game with a forced draw assuming best
 *      play from both players.
 * 
 *      The game can be generalized to an m,n,k-game in which two players alternate placing
 *      stones of their own color on an m×n board, with the goal of getting k of their own
 *      color in a row. Tic-tac-toe is the (3,3,3)-game.[3] 
 * 
 *      Harary's generalized tic-tac-toe is an even broader generalization of tic-tac-toe.
 *      It can also be generalized as a nd game. Tic-tac-toe is the game where n equals 3
 *      and d equals 2.[4] It can be generalised even further by playing on an arbitrary
 *      incidence structure, where rows are lines and cells are points."
 *                                                                              - Wikipedia 
 */

enum Cell { X = 'X', O = 'O', _ = '_' }

type Board = Cell[][];

const range = (n: Number) => [...Array(n).keys()];

const vectorWin = (vector: Cell[]) => vector.every(e => e !== Cell._ && e === vector[0]);

const diagonalCells = (b: Board): Cell[][] => [range(3).map(i => b[i][i]), range(3).map(i => b[i][3 - i])];

/**
 * Returns true when there's a winning position in either side. 
 */
const isWin = (b: Board): boolean => {
    const pluckCol = (c: number) => b.map(row => row[c]);
    const horOrVertWinAtOffset = (i: number) => vectorWin(pluckCol(i)) || vectorWin(b[i]);
    const nonDiag = range(3).map(i => horOrVertWinAtOffset(i)).some(x => x);
    return nonDiag || vectorWin(diagonalCells(b)[0]) || vectorWin(diagonalCells(b)[1]);
}

const parse = (lines: string[]): Board => lines.map(e => [...e].map(x => Cell[x as keyof typeof Cell]));

const pretty = (b: Board): string => '\n'.concat(b.map(r => r.map(x=> x).join(' ').concat('\n')).join(''));

/**
 * TESTS
 */
console.log(!isWin(
    parse([
        'XOX',
        'OOX',
        '___'])) ? 'passed' : 'failed');

console.log(isWin(
    parse([
        'XOX',
        'OOX',
        '_O_'])) ? 'passed' : 'failed');

console.log(isWin(
    parse([
        'O_X',
        'OOX',
        '_OO'])) ? 'passed' : 'failed');

console.log(pretty(parse([
        'O_X',
        'OOX',
        '_OO'])));
