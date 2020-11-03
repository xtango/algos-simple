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
    const horizWinAtOffset = (i: number) => isNInARow(pluckCol(i))
    const VertWinAtOffset = (i: number) => isNInARow(pluckCol(i))

    const horizWinner = range(b.length).forEach(i => {
        if (horizWinAtOffset(i)) {
            return b[i][0];
        } else if (VertWinAtOffset(i)) {
            return b[0][i];
        }
        return Player.None;
    })
    const diags = diagonalCells(b);
    if (isNInARow(diags[0]) || isNInARow(diags[1])) {
        return b[1][1]; // center cell
    }
    return Player.None;
}

const parse = (lines: string[]): Board =>
    lines.map(e => [...e].map(x => x === 'X' ? Player.X : x === 'O' ? Player.O : Player.None))

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
            if (b[i][j] === Player.None) {
                moves.push([i, j])
            }
        }
    }
    return moves;
}

const prettyMove = (depth: number, y: number, x: number ) => `[Depth ${depth}] ${y},${x}`;

/**
 * Changes the board in place at y, x.
 */
const move = (b: Board, y: number, x: number, player: Player) => {
    b[y][x] = player;
}


/**
 *  Given b, the board, find the optimal play for maximizer/minimizer player
 */
const miniMax = (b: Board, isMaxmizer: boolean, depth: number = 0): number => {
    if (depth >= 3) {// Max Recursion Depth
        console.log('Aborting, max recursion reached');
        return -1;
    }

    const moves = possibleMoves(b);
    if (moves.length === 0) {
        return 0; // Draw
    } else {
        const whoWon: Player = winner(b);
        console.log(`winner => ${winner}`)
    }

    if (isMaxmizer) {
        let bestVal = Infinity * -1;
        moves.forEach(move => {
            console.log(prettyMove(depth, move[0], move[1]));
            const minimizerVal = miniMax(b, false, depth + 1);
            bestVal = Math.max(minimizerVal, bestVal);
        });
        console.log(`[maximizer] best -> `, bestVal);
        return bestVal;
    } else {
        let best = Infinity;
        moves.forEach(move => {
            console.log(prettyMove(depth, move[0], move[1]));
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

console.log(isNInARow([Player.X, Player.X, Player.X]) ? 'passed' : 'failed');

console.log(!isNInARow([Player.None, Player.None, Player.None]) ? 'passed' : 'failed');

console.log(!winner(parse([
    'XOX',
    'OOX',
    '___'])) ? 'passed' : 'failed');

console.log(winner(parse([
    'XOX',
    'OOX',
    '_O_'])) ? 'passed' : 'failed');
console.log(winner(parse([
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
