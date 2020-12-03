/**
 * SPIRAL WALK
 * Traverse a matrix in a clock-wise spiral order.
 * 
 * Example
 * 1 -> 2 -> 3 
 *           |
 *           v
 * 4 -> 5    6    -> 1 2 3 6 9 8 7 4 5
 * ^         |
 * |         v
 * 7 <- 8 <- 9  
 */

type DirOffset = { y: number, x: number };

interface Bounds { yMin: number, yMax: number, xMin: number, xMax: number };

/**
 * Return the new offsets on a change direction. Clockwise walk, so turn right
 *                  R     ->  D       ->  L       ->  U       -> R ...
 * Offsets y, x     0, 1      1, 0        0, -1      -1, 0
 */
const nextDirection = (offset: DirOffset): DirOffset => { return { y: offset.x, x: -offset.y } }

const shrinkBounds = (bounds: Bounds, dir: DirOffset): Bounds => {
    return {
        yMin: bounds.yMin + (dir.y == 0 && dir.x == 1 ? 1 : 0), //  moved right -> completed a top row
        yMax: bounds.yMax + (dir.y == 0 && dir.x == -1 ? -1 : 0), //  moved left -> completed a bottom row
        xMin: bounds.xMin + (dir.y == -1 && dir.x == 0 ? -1 : 0), // moved up -> completed a left col
        xMax: bounds.xMax + (dir.y == 1 && dir.x == 0 ? -1 : 0), //  moved down -> completed a right col
    }
}

const outOfBounds = (y: number, x: number, bounds: Bounds) =>
    y > bounds.yMax || y < bounds.yMin || x > bounds.xMax || x < bounds.xMin;


const spiralWalk = (mat: number[][]): number[] => {
    // Inclusive indices
    let bounds: Bounds = {
        yMin: 0,
        yMax: mat.length - 1,
        xMin: 0,
        xMax: mat[0].length - 1
    }

    let direction: DirOffset = { y: 0, x: 1 } // Move right initially

    let y = 0;
    let x = 0;
    let i = 0;
    const out = [];
    const MAX_I = mat.length * mat[0].length;
    
    while (i < MAX_I) {
        out.push(mat[y][x]);
        console.log(`(${y}, ${x}) -> ${mat[y][x]}`);
        // Out of bounds, shrink and change direction
        if (outOfBounds(y + direction.y, x + direction.x, bounds)) {
            bounds = shrinkBounds(bounds, direction);
            direction = nextDirection(direction);
        }
        y = y + direction.y;
        x = x + direction.x;
        i++;
    }
    return out;
}

/**
 * TEST
 */
console.log('Test', spiralWalk(
    [[1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]]).join(' ') == '1 2 3 6 9 8 7 4 5');
