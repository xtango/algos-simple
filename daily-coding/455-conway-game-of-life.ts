/**
 *                      #455 [Medium] - GAME OF LIFE
 * 
 * This problem was asked by Dropbox.
 * 
 * Conway's Game of Life takes place on an infinite two-dimensional
 * board of square cells. Each cell is either dead or alive, and at
 * each tick, the following rules apply:
 * 
 *      Any live cell with less than two live neighbours dies.
 *      Any live cell with two or three live neighbours remains living.
 *      Any live cell with more than three live neighbours dies.
 *      Any dead cell with exactly three live neighbours becomes a live cell.
 *      A cell neighbours another cell if it is horizontally, vertically, or diagonally adjacent.
 * 
 * Implement Conway's Game of Life. It should be able to be initialized with
 * a starting list of live cell coordinates and the number of steps it should run for.
 * Once initialized, it should print out the board state at each step. Since it's an 
 * infinite board, print out only the relevant coordinates, i.e. from the top-leftmost
 * live cell to bottom-rightmost live cell.
 * 
 * You can represent a live cell with an asterisk (*) and a dead cell with a dot (.).
 */

/**
 * (x, y) offsets of neighbors
 */
const NEIGHBOR_OFFSETS: number[][] = [
    [-1, -1], [0, -1], [1, -1], // top left, top, top right
    [-1, 0], /* [x, y] */, [1, 0], // left, Current Cell, right
    [-1, 1], [0, 1], [1, 1]]; // bottom left, bottom, bottom right

/**
 * Stores alive cells in a hashmap, allowing for an infinite board.
 */
class Board {
    constructor(
        public minX: number = Number.POSITIVE_INFINITY,
        public minY: number = Number.POSITIVE_INFINITY,
        public maxX: number = Number.NEGATIVE_INFINITY,
        public maxY: number = Number.NEGATIVE_INFINITY,
        public aliveCells: { [key: string]: number } = {},
        public step: number = 0) { };

    makeKey(x: number, y: number): string {
        return `${x} ${y}`;
    }

    valAt(x: number, y: number): number {
        return this.aliveCells[this.makeKey(x, y)] || 0;
    }

    aliveNeighborCount(x: number, y: number): number {
        return NEIGHBOR_OFFSETS.reduce((accum, offset) => {
            accum += this.valAt(x + offset[0], y + offset[1]);
            return accum;
        }, 0)
    }

    /**
     * In place update
     */
    static setCell(board: Board, x: number, y: number, value: number) {
        board.aliveCells[board.makeKey(x, y)] = value;
        board.minX = Math.min(board.minX, x);
        board.minY = Math.min(board.minY, y);
        board.maxX = Math.max(board.maxX, x);
        board.maxY = Math.max(board.maxY, y);
    }

    clone() {
        return new Board(this.minX, this.minY, this.maxX, this.maxY, { ...this.aliveCells });
    }

    /**
     * Changes the state in-place, applying the "Life" rules.
     */
    next(): Board {
        this.step += 1;
        const original = this.clone();
        const [startX, endX, startY, endY] = [
            original.minX - 1, original.maxX + 1,
            original.minY - 1, original.maxY + 1];
        for (let y = startY; y <= endY; y++) {
            for (let x = startX; x <= endX; x++) {
                const live = original.aliveNeighborCount(x, y);
                if (this.valAt(x, y) === 1) {
                    // Death: Any live cell with less than two live neighbours dies.
                    //        Any live cell with more than three live neighbours dies.
                    if (live < 2 || live > 3) {
                        Board.setCell(this, x, y, 0);
                    }
                    // Survive: Any live cell with two or three live neighbours remains living.
                    //          -> Do nothing
                } else {
                    // Birth: Any dead cell with exactly three live neighbours becomes a live cell.
                    if (live === 3) {
                        Board.setCell(this, x, y, 1);
                    }
                }
            }
        }

        return this;
    }

    prettyPrint(): string {
        let str = `Step ${this.step}\n`;
        for (let y = this.minY; y <= this.maxY; y++) {
            str += `${y.toString().padStart(4)} : `;
            for (let x = this.minX; x <= this.maxX; x++) {
                const val = this.valAt(x, y);
                str += (val === 1 ? '*' : '.') + ' ';
            }
            str += '\n';
        }
        return str;
    }
}

class GameOfLife {
    static boardFromFile(file: string): Board {
        const lines = file.split('\n');
        const board: Board = new Board();
        lines.forEach(line => {
            const trimmed = line.trim();
            if (trimmed[0] !== '#') {
                const tokens = trimmed.split(' ');
                const [x, y] = [parseInt(tokens[0]), parseInt(tokens[1])];
                Board.setCell(board, x, y, 1);
            }
        })
        return board;
    }

    static run(file: string, steps: number) {
        let board = GameOfLife.boardFromFile(file);
        console.log(board.prettyPrint());
        for (let i = 1; i < steps; i++) {
            board = board.next();
            console.log(board.prettyPrint());
        }
    }
}



/**
 * ASSERTIONS
 */
const GLIDER = `#Life 1.06
0 -1
1 0
-1 1
0 1
1 1`;

GameOfLife.run(GLIDER, 5);
