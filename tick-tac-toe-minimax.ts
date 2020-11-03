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


enum Cell { X = 'X', O = 'O', Empty = '_' }

type Board = Cell[][];

type Coordinate = number[];

const range = (n: Number) => [...Array(n).keys()];

const isNInARow = (vector: Cell[]) => vector.every(e => e !== Cell.Empty && e === vector[0]);

const diagonalCells = (b: Board): Cell[][] => [
    range(b.length).map(i => b[i][i]),
    range(b.length).map(i => b[i][b.length - i])];

/**
 * Returns true when there's a winning position for either player. 
 */
const isWin = (b: Board): boolean => {
    const pluckCol = (c: number) => b.map(row => row[c]);
    const horOrVertWinAtOffset = (i: number) => isNInARow(pluckCol(i)) || isNInARow(b[i]);
    const nonDiagWin = range(b.length).map(i => horOrVertWinAtOffset(i)).some(x => x);
    const diags = diagonalCells(b);
    return nonDiagWin || isNInARow(diags[0]) || isNInARow(diags[1]);
}

const parse = (lines: string[]): Board =>
    lines.map(e => [...e].map(x => x === 'X' ? Cell.X : x === 'O' ? Cell.O : Cell.Empty))

const pretty = (b: Board): string => '\n'.concat(
    b.map(r => r.map(x => x)
        .join(' ')
        .concat('\n')).join(''));

/**
 * Returns y, x tuples for empty cells
 */
const possibleMoves = (b: Board): Coordinate[] => {
    const moves: Coordinate[] = [];
    for (let i = 0; i < b.length; i++) {
        for (let j = 0; j < b.length; j++) {
            if (b[i][j] === Cell.Empty) {
                moves.push([i, j])
            }
        }
    }
    return moves;
}


/**
 *  Given b, the board, find the optimal play for maximizer/minimizer player
 */
const miniMax = (b: Board, isMaxmizer: boolean, depth: number = 0): number => {
    const moves = possibleMoves(b);
    if (depth >= 10) {// MAX_DEPTH_RECURSION
        console.log('Aborting, max recursion reached');
        return -1;
    }

    if (isMaxmizer) {
        let best = Infinity * -1;
        moves.forEach(move => {
            const minimizerVal = miniMax(b, false, depth + 1);
            best = Math.max(minimizerVal, best);
        });
        console.log(`[maximizer] best -> `, best);
        return best;
    } else {
        let best = Infinity;
        moves.forEach(move => {
            const maximizerVal = miniMax(b, true, depth + 1); // maximizer val
            best = Math.min(maximizerVal, best);
            console.log(`[minimizer] best -> `, best);
        });
        return best;
    }
}

/**
 * TESTS
 */

console.log(isNInARow([Cell.X, Cell.X, Cell.X]) ? 'passed' : 'failed');
console.log(!isNInARow([Cell.Empty, Cell.Empty, Cell.Empty]) ? 'passed' : 'failed');

console.log(!isWin(parse([
    'XOX',
    'OOX',
    '___'])) ? 'passed' : 'failed');

console.log(isWin(parse([
    'XOX',
    'OOX',
    '_O_'])) ? 'passed' : 'failed');
console.log(isWin(parse([
    'O_X',
    'OOX',
    '_OO'])) ? 'passed' : 'failed');
console.log(pretty(parse([
    'O_X',
    'OOX',
    '_OO'])));

console.log(miniMax(parse([
    'O_X',
    'OOX',
    '_OO'
]), true));
