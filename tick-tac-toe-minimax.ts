/**
 * Tic Tac Toe using minimax
 */

enum TTT { X = 'X', O = 'O', _ = '_' }
type Board = TTT[][];

const range = (n: Number) => [...Array(n).keys()];

const vectorWin = (vector: TTT[]) => vector.every(e => e !== TTT._ && e === vector[0]);

const diagA = (b: Board): TTT[] => range(3).map(i => b[i][i]);

const diagB = (b: Board): TTT[] => range(3).map(i => b[i][3 - i]);


/**
 * Returns 
 */
const isWin = (b: Board): boolean => {
    const pluckCol = (c: number) => b.map(row => row[c]);
    const horOrVertWinAtOffset = (i: number) => vectorWin(pluckCol(i)) || vectorWin(b[i]);
    const nonDiag = range(3).map(i => horOrVertWinAtOffset(i)).some(x => x);
    return nonDiag || vectorWin(diagA(b)) || vectorWin(diagB(b))
}

const parse = (lines: string[]): Board =>
    lines.map(e => [...e]
        .map(x => TTT[x as keyof typeof TTT]));

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
        'OOX',
        'OXX',
        '_OO'])) ? 'passed' : 'failed');        
