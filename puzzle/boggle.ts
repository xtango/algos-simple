/**
 *                            BOGGLE
 * 
 */
const isWord = (dict: string[], str: string): boolean => dict.includes(str);

const OFFSETS = [
    [-1, -1], // top-left
    [-1, 0], // top
    [-1, 1], // top-right
    [0, 1], // right
    [1, 1], // bottom-right
    [1, 0], // bottom
    [1, -1], // bottom -left
    [0, -1], // left
];

type RowCol = number[];

const visitedKey = (yx: RowCol) => `${yx[0]},${yx[1]}`;

const findWords = (dict: string[], board: string[][]): string[] => {
    const MAX_DEPTH = 20;
    const found: string[] = [];
    const len: RowCol = [board.length, board[0].length];
    const visited: { [yx: string]: number } = {};

    const withinBounds = (cell: RowCol): boolean =>
        cell[0] >= 0 && cell[0] < len[0] &&
        cell[1] >= 0 && cell[1] < len[1];

    const traverse = (cell: RowCol, depth: number) => {
        const key = visitedKey(cell);
        console.log(`[depth: ${depth}] visit`, key, board[cell[0]][cell[1]]);
        visited[key] = 1;
        if (depth > MAX_DEPTH) {
            return;
        }

        OFFSETS.forEach(offset => {
            const adjacent = [cell[0] + offset[0], cell[1] + offset[1]];
            if (withinBounds(adjacent) && !visited[visitedKey(adjacent)]) {
                traverse(adjacent, depth + 1);
            }
        })
    }

    traverse([0, 0], 0);
    return found;
}

/**
 * ASSERTIONS
 */
const DICTIONARY = ['are', 'tar', 'aero', 'opal'];

const BOARD_1 = [
    ['t', 'a', 'e'],
    ['l', 'r', 'p'],
    ['u', 'b', 'o']];
findWords(DICTIONARY, BOARD_1);
