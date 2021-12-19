/**
 *                      #455 [Medium] - CONWAYS' GAME OF LIFE
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
 * (x, y) offsets of neighbours
 */
const NEIGHBOR_OFFSETS = [
    [-1, -1], // top left
    [0, -1], // top
    [1, -1], // top right
    [1, 0], // right
    [1, 1], // bottom right
    [0, 1], // bottom
    [-1, 1], // bottom left
    [-1, 0], // left
];

class Board {
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
    alive: { [key: string]: number }

    constructor() {
        this.minX = Number.POSITIVE_INFINITY;
        this.minY = Number.POSITIVE_INFINITY;
        this.maxX = Number.NEGATIVE_INFINITY;
        this.maxY = Number.NEGATIVE_INFINITY;
        this.alive = {}
    };

    makeKey(x: number, y: number): string {
        return `${x} ${y}`;
    }

    valAt(x: number, y: number): number {
        return this.alive[this.makeKey(x, y)] || 0;
    }

    neighborCount(x: number, y: number): { live: number, dead: number } {
        let live = 0;
        NEIGHBOR_OFFSETS.forEach(offset => {
            const [neighborX, neighborY] = [x + offset[0], y + offset[1]];
            const val = this.valAt(neighborX, neighborY);
            live += val;
        })
        return { live, dead: 8 - live }
    }

    /**
     * In place update
     */
    setAlive(x: number, y: number) {
        this.alive[this.makeKey(x, y)] = 1;
        this.minX = Math.min(this.minX, x);
        this.minY = Math.min(this.minY, y);
        this.maxX = Math.max(this.maxX, x);
        this.maxY = Math.max(this.maxY, y);
    }

    next(): Board {
        // todo: implement rules
        return this; // todo
    }

    prettyPrint(): string {
        let str = '';
        for (let y = this.minY; y <= this.maxY; y++) {
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
                board.setAlive(x, y);
            }
        })
        return board;
    }

    static run(file: string, steps: number) {
        let board = GameOfLife.boardFromFile(file);
        console.log(`Step: 0\n${board.prettyPrint()}\n`);
        for (let i = 1; i < steps; i++) {
            board = board.next();
            console.log(`Step: ${i}\n${board.prettyPrint()}\n`);
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

GameOfLife.run(GLIDER, 2);
