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

enum Player { X = 'X', O = 'O', None = '_' }

type Board = Player[][];

type Coordinate = number[];

interface Move { y: number, x: number, player: Player }

const range = (n: Number) => [...Array(n).keys()];

const isNInARow = (vector: Player[]) => vector.every(e => e !== Player.None && e === vector[0]);

const diagonalCells = (b: Board): Player[][] => [
    range(b.length).map(i => b[i][i]),
    range(b.length).map(i => b[i][b.length - i])];

/**
 * Returns the player if board is in a won state. Otherwise None.
 */
const winner = (b: Board): Player => {
    const pluckCol = (c: number) => b.map(row => row[c]);

    for (let i = 0; i < b.length; i++) {
        if (isNInARow(b[i])) { // Horiz win
            return b[i][0];
        } else if (isNInARow(pluckCol(i))) { // Vertical win
            return b[0][i];
        }
    }

    const diags = diagonalCells(b);
    if (isNInARow(diags[0]) || isNInARow(diags[1])) {
        return b[1][1]; // center cell
    }
    return Player.None;
}

const parse = (lines: string[]): Board =>
    lines.map(e => [...e].map(x => x === 'X' ? Player.X : x === 'O' ? Player.O : Player.None))

const pretty = (b: Board): string => {
    const grid = '\n'.concat(
    b.map(r => r.map(x => x)
        .join(' ')
        .concat('\n')).join(''));

    const whoWon = winner(b);
    return `${grid}${whoWon == Player.None ? '' : whoWon + ' wins'}`
}

/**
 * Returns y, x tuples for empty cells
 */
const possibleMoves = (b: Board): Coordinate[] => {
    const moves: Coordinate[] = [];
    for (let i = 0; i < b.length; i++) {
        for (let j = 0; j < b.length; j++) {
            if (b[i][j] === Player.None) {
                moves.push([i, j])
            }
        }
    }
    return moves;
}

const prettyMove = (depth: number, y: number, x: number) => `[Depth ${depth}] ${y},${x}`;

/**
 * Changes the board in place at y, x.
 */
const makeMove = (b: Board, mv: Move, depth: number) => {
    b[mv.y][mv.x] = mv.player;
    console.log(prettyMove(depth, mv.y, mv.x));
}


/**
 *  Given b, the board, find the optimal play for maximizer/minimizer player
 */
const miniMax = (b: Board, isMaximizer: boolean, depth: number = 0): number => {
    if (depth >= 3) {// Max Recursion Depth
        console.log('Aborting, max recursion reached');
        return -1;
    }

    const moves = possibleMoves(b);
    if (moves.length === 0) {
        return 0; // Draw
    } else {
        const whoWon: Player = winner(b);
        if (whoWon === Player.X) return 1;
        else if (whoWon === Player.O) return -1;
    }

    let bestVal = isMaximizer ? Infinity * -1 : Infinity;
    moves.forEach(mv => {
        makeMove(b, { y: mv[0], x: mv[1], player: isMaximizer ? Player.X : Player.O }, depth);
        const val = miniMax(b, !isMaximizer, depth + 1);
        bestVal = isMaximizer ? Math.max(val, bestVal) : Math.min(val, bestVal);
    });
    console.log(`[maximizer] bestVal -> `, bestVal, pretty(b));
    return bestVal;
}

/**
 * TESTS
 */

console.log(isNInARow([Player.X, Player.X, Player.X]) ? 'passed' : 'failed');

console.log(!isNInARow([Player.None, Player.None, Player.None]) ? 'passed' : 'failed');

console.log(winner(parse([
    'XOX',
    'OOX',
    '___'])) === Player.None ? 'passed' : 'failed');

console.log(winner(parse([
    'XOX',
    'OOX',
    '_O_'])) === Player.O ? 'passed' : 'failed');

console.log(winner(parse([
    'O_X',
    'OOX',
    '_OO'])) === Player.O ? 'passed' : 'failed');
console.log(pretty(parse([
    'O_X',
    'OOX',
    '_OO'])));

console.log(miniMax(parse([
    'X_X',
    'OOX',
    '_OO'
]), true));
