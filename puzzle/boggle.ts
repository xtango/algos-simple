/**
 *                            BOGGLE https://en.wikipedia.org/wiki/Boggle
 */
type BoardCells = string[][];
type RowCol = number[];

/**
 * Models a NxM Boggle board.
 */
class BoggleBoard {
    cells: BoardCells;
    boardLen: RowCol;

    constructor(cells: BoardCells) {
        this.cells = cells;
        this.boardLen = [cells.length, cells[0].length];
    }

    withinBounds(cell: RowCol): boolean {
        return cell[0] >= 0 && cell[0] < this.boardLen[0] && cell[1] >= 0 && cell[1] < this.boardLen[1];
    }

    adjacentCells(cell: RowCol): number[][] {
        const adjCells = [];
        for (let r = -1; r <= 1; r++) {
            for (let c = -1; c <= 1; c++) {
                const neighbor = [cell[0] + r, cell[1] + c];
                if (!(r == 0 && c === 0) && this.withinBounds(neighbor)) {
                    adjCells.push(neighbor);
                }
            }
        }
        return adjCells;
    }

    /** 
     * Factory method that creates a N X M board with random non-repeating letters
     */
    static createRandom(nRows: number, mCols: number): BoggleBoard {
        const letters: string[] = []
        while (letters.length < nRows * mCols) {
            const rand = Math.floor((Math.random() * 26));
            const randChar = String.fromCharCode(rand + 97);
            if (!letters.includes(randChar)) {
                letters.push(randChar)
            }
        }

        // Create board from letters array
        let i = 0;
        const cells = []
        for (let r = 0; r < nRows; r++) {
            const rowChars = []
            for (let c = 0; c < mCols; c++) {
                rowChars.push(letters[i]);
                i++;
            }
            cells.push(rowChars);
        }
        return new BoggleBoard(cells);
    }

    pretty(): string {
        return '\nBOARD\n' + this.cells.map(r => r.join(' ')).join('\n');
    }

}

/**
 * TRIE representation of dictionary words. This can be faster than using
 * @example A TRIE for the words 'to', 'tea' and 'it'.
 * 
 *                      ROOT
 *                /            \
 *          char: t            char: i  
 *         /        \                 \ t
 *   char: o        char: e            char: t
  *  word: "to"     /    \             word: "it"
 *            char: t      val: n
 *           word: "tea"   word: "ten"
 */
class TrieNode {
    children: { [char: string]: TrieNode } = {}; // Hashmap of char -> Node holding immediate children.
    isLeaf: boolean = false; // True when last node. Represents a complete word.
    constructor(readonly char: string) { }
}

/**
 * Stores dictionary words in a TRIE for fast lookup.
 */
class DictionaryTrie {
    root: TrieNode;
    maxWordLength: number = 0;

    constructor(readonly arr: string[]) {
        this.root = new TrieNode('');
        arr.forEach(word => this.insert(word))
    }

    /**
     * Walk the trie for the key (e.g. 'tea') to be inserted, appending
     * new nodes for the suffix of the string not contained in trie.
     */
    insert(key: string) {
        let node = this.root;
        for (let char of key) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode(char);
            }
            node = node.children[char];
        }
        node.isLeaf = true;
        if (this.maxWordLength < key.length) {
            this.maxWordLength = key.length;
        }
    }

    /**
     * Returns the node if found or undefined if not found.
     */
    findNode(word: string, startNode?: TrieNode): TrieNode | undefined {
        let node = startNode ? startNode : this.root;
        for (let char of word) {
            const child = node.children[char];
            if (!child) {
                return undefined;
            }
            node = child;
        }
        return node
    }
}

/**
 * Depth first recursive approach to finding dictionary words on the board.
 */
const solve = (dict: DictionaryTrie, board: BoggleBoard): string[] => {
    const MAX_DEPTH = 20; // Circuit breaker
    const foundWords: string[] = [];
    const visited: { [yx: string]: number } = {};
    const visitedKey = (yx: RowCol) => `${yx[0]},${yx[1]}`;

    /** 
     * Helper func for recursion
     */
    const traverse = (cell: RowCol, word: string, searchRoot: TrieNode, depth: number = 0) => {
        if (
            depth > MAX_DEPTH // Abort when max recursion depth reached
            || word.length > dict.maxWordLength // Stop when > longest dictionary word
        ) {
            return;
        }

        const key = visitedKey(cell);
        visited[key] = 1;
        const char = board.cells[cell[0]][cell[1]];
        word = word + char;
        console.log(`[depth: ${depth}] visit`, key, board.cells[cell[0]][cell[1]], word);

        const foundNode = dict.findNode(char, searchRoot); // word);
        if (foundNode?.isLeaf) { // When leaf, we've hit a word
            foundWords.push(word);
            console.log('Found!', word);
        }

        board.adjacentCells(cell).forEach(adj => {
            if (!visited[visitedKey(adj)] && foundNode) {
                traverse(adj, word, foundNode, depth + 1);
            }
        });
        // Reset vistited for the cell and trim last char
        visited[key] = 0;
        word = word.substring(0, word.length - 1);
    }

    // Driver: Call traverse() for every cell(r, c) 
    //         whose 1st char is in dict root children.
    //          @example For dict = ['aero', 'are', 'opal', 'tad'],
    //          the root's children are ['a', 'o', 't']
    for (let r = 0; r < board.boardLen[0]; r++) {
        for (let c = 0; c < board.boardLen[1]; c++) {
            const val = board.cells[r][c];
            if (dict.root.children[val]) {
                traverse([r, c], '', dict.root);
            }
        }
    }

    console.log('Words in', board.pretty(), foundWords);
    return foundWords;
}

/**
 * Randomly creates boards and returns the board that produces the largest num of words.
 */
const findBestBoard = (numRows: number, numCols: number, maxIter = 5): { cells: BoardCells, words: string[] } => {
    console.log('BEST BOARD FINDER')
    let i = 0;
    let bestBoard;
    let maxWords: string[] = [];
    while (i < maxIter) {
        const board = BoggleBoard.createRandom(numRows, numCols);
        const words = solve(DICT_TRIE, board);
        console.log(board.pretty(), '->', words);
        if (maxWords.length < words.length) {
            bestBoard = board;
            maxWords = words;
        }
        i++
        
    }
    return { cells: bestBoard?.cells || [], words: maxWords };
}

/**
 * ASSERTIONS
 */
const DICT_TRIE = new DictionaryTrie(
    ['at', 'aero', 'are', 'dare', 'it', 'opal', 'rope', 'rap', 'tad', 'tar', 'trope', 'tape', 'tread']
);

// // Test in dictionary
// console.log(DICT_TRIE.arr.every(word => DICT_TRIE.findNode(word)));

// // Test abscence
// console.log(['tens', 'te'].every(word => !DICT_TRIE.findNode(word)));

// const node = DICT_TRIE.findNode('ta');
// console.log(DICT_TRIE.findNode('r', node));

// // Test solver: 2x2
// const BOARD_2x2 = new BoggleBoard([
//     ['a', 'e'],
//     ['r', 'p']]);
// console.log(solve(DICT_TRIE, BOARD_2x2)
//     .length > 1); // ['are', 'rap']

// // Test randomizer
// console.log(BoggleBoard.createRandom(2, 2).cells.length === 2);

// // Test solver: 3x3
// const BOARD_3x3 = new BoggleBoard([
//     ['t', 'a', 'e'],
//     ['d', 'r', 'p'],
//     ['u', 'b', 'o']]);
// console.log(solve(DICT_TRIE, BOARD_3x3)
//     .length > 9); // ["tad", "tar", "tape", "tread", "trope", "aero", "are", "dare", "rap", "rope"]

// Test Random Best Board
console.log(findBestBoard(2, 2, 10));
