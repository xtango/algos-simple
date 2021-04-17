/**
 *                            BOGGLE
 * 
 */
const withinBounds = (boardLen: RowCol, cell: RowCol): boolean =>
    cell[0] >= 0 && cell[0] < boardLen[0] &&
    cell[1] >= 0 && cell[1] < boardLen[1];

const adjacentCells = (boardLen: RowCol, cell: RowCol): number[][] => {
    const adjCells = [];
    for (let r = -1; r <= 1; r++) {
        for (let c = -1; c <= 1; c++) {
            const neighbor = [cell[0] + r, cell[1] + c];
            if (!(r == 0 && c === 0) && withinBounds(boardLen, neighbor)) {
                adjCells.push(neighbor);
            }
        }
    }
    return adjCells;
}

type RowCol = number[];

const visitedKey = (yx: RowCol) => `${yx[0]},${yx[1]}`;

const solve = (dict: string[], board: string[][]): string[] => {
    const MAX_DEPTH = 10;
    const found: string[] = [];
    const len: RowCol = [board.length, board[0].length];
    const visited: { [yx: string]: number } = {};
    const dictMap: { [word: string]: number } = {};

    const traverse = (cell: RowCol, depth: number, word: string) => {
        const key = visitedKey(cell);
        visited[key] = 1;
        word = word + board[cell[0]][cell[1]];

        // Linear seach through Dict array
        if (dictMap[word]) {
            found.push(word);
        }
        console.log(`[depth: ${depth}] visit`, key, board[cell[0]][cell[1]], word);

        if (depth > MAX_DEPTH) {
            return;
        }
        adjacentCells(len, cell)
            .forEach(adj => {
                if (!visited[visitedKey(adj)]) {
                    traverse(adj, depth + 1, word);
                }
            });
        // reset vistited for the cell and trim word
        visited[key] = 0;
        word = word.substring(0, word.length - 2);
    }

    // Build dictMap for faster lookups
    dict.forEach(word => { dictMap[word] = 1; })
    traverse([0, 0], 0, '');
    return found;
}

/**
 * ASSERTIONS
 */
const DICTIONARY = ['are', 'tad', 'tar', 'aero', 'opal', 'tape', 'tread'];

const BOARD_1 = [
    ['t', 'a', 'e'],
    ['d', 'r', 'p'],
    ['u', 'b', 'o']];

console.log(adjacentCells([3, 3], [0, 0]));
console.log(solve(DICTIONARY, BOARD_1));
