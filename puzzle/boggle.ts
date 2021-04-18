/**
 *                            BOGGLE
 * 
 */

type BoardCells = string[][];
type RowCol = number[];
const visitedKey = (yx: RowCol) => `${yx[0]},${yx[1]}`;

class BoggleBoard {
    cells: BoardCells;
    boardLen: RowCol;

    constructor(cells: BoardCells) {
        this.cells = cells;
        this.boardLen = [cells.length, cells[0].length];
    }

    withinBounds(cell: RowCol): boolean {
        return cell[0] >= 0 &&
            cell[0] < this.boardLen[0] &&
            cell[1] >= 0 &&
            cell[1] < this.boardLen[1];
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
}

class DictionaryHashmap {
    dictMap: { [word: string]: number } = {};

    constructor(arr: string[]) {
        arr.forEach(word => { this.dictMap[word] = 1; })
    }

    exists(word: string): boolean {
        return this.dictMap[word] > 0;
    }
}

/**
 * TRIE representation of dictionary. This can be faster than Dicitonary Hashmap/
 * @example trie for 'to', 'tea' and 'it'
 * 
 *                    ROOT
 *               /           \
 *          char: t           char: i  
 *         /        \                \ t
 *   char: o        char: e          char: t
  *  word: "to"     /    \           word: "it"
 *            val: t      val: n
 *           word: "tea"  word: "ten"
 */
class TrieNode {
    // Hashmap of char -> Node holding immediate children.
    children: { [char: string]: TrieNode };

    // True when last node
    isLeaf: boolean = false;

    constructor(readonly char: string) {
        this.children = {};
    }
}

class DictionaryTrie {
    root: TrieNode;
    maxWordLength: number = 0;

    constructor(arr: string[]) {
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

    contains(word: string): boolean {
        let node = this.root;
        for (let char of word) {
            const child = node.children[char];
            if (!child) {
                return false;
            }
            node = child;
        }
        // It's a word if leaf
        return node.isLeaf;
    }
}

/**
 * Depth first recursive approach to finding dictionary words on the board.
 */
const solveDepthFirst = (dictionayArr: string[], board: BoggleBoard): string[] => {
    const MAX_DEPTH = 20; // Circuit breaker
    const found: string[] = [];
    const visited: { [yx: string]: number } = {};
    const dict = new DictionaryTrie(dictionayArr);

    const traverse = (cell: RowCol, word: string, depth: number) => {
        if (
            depth > MAX_DEPTH // Abort when max recursion depth reached
            || word.length > dict.maxWordLength // Stop when > longest dictionary word
        ) {
            return;
        }

        const key = visitedKey(cell);
        visited[key] = 1;
        word = word + board.cells[cell[0]][cell[1]];
        console.log(`[depth: ${depth}] visit`, key, board.cells[cell[0]][cell[1]], word);

        if (dict.contains(word)) {
            found.push(word);
            console.log('found', word);
        }

        board.adjacentCells(cell).forEach(adj => {
            if (!visited[visitedKey(adj)]) {
                traverse(adj, word, depth + 1);
            }
        });
        // reset vistited for the cell and trim last char
        visited[key] = 0;
        word = word.substring(0, word.length - 1);
    }

    // Call traverse() for  every cell(r, c) whose first char is in the dict's root children.
    // @example for a dictionary = ['aero', 'are', 'opal', 'tad'],
    //          the root's children are ['a', 'o', 't']
    for (let r = 0; r < board.boardLen[0]; r++) {
        for (let c = 0; c < board.boardLen[1]; c++) {
            const val = board.cells[r][c];
            if (dict.root.children[val]) {
                traverse([r, c], '', 0);
            } else {
                console.log('Skip', val);
            }
        }
    }
    return found;
}


/**
 * ASSERTIONS
 */
// Test Dictionary
const DICTIONARY = ['aero', 'are', 'dare', 'opal', 'rope', 'tad', 'tar', 'trope', 'tape', 'tread'];
const trie = new DictionaryTrie(DICTIONARY);
console.log(DICTIONARY.every(word => trie.contains(word)));
console.log(!new DictionaryTrie(DICTIONARY).contains('tens'));
console.log(!new DictionaryTrie(DICTIONARY).contains('te'));

// Test randomizer
console.log(BoggleBoard.createRandom(2, 2).cells.length === 2);

// // Test solver
const BOARD_0 = new BoggleBoard([
    ['a', 'e'],
    ['r', 'p'],
    ['b', 'o']]);
console.log(solveDepthFirst(DICTIONARY, BOARD_0));


// // Test solver
// const BOARD_1 = new BoggleBoard([
//     ['t', 'a', 'e'],
//     ['d', 'r', 'p'],
//     ['u', 'b', 'o']]);
// console.log(solveDepthFirst(DICTIONARY, BOARD_1));

