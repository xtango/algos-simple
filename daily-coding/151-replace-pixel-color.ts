/**
 *                                  #151 [Medium] - REPLACE PIXEL COLOR   **** work in progres ***
 * 
 * Given a 2-D matrix representing an image, a location of a pixel in the screen and a color C,
 * replace the color of the given pixel and all adjacent same colored pixels with C.
 * 
 * For example, given the following matrix, and location pixel of (2, 2), and 'G' for green:
 * 
 * B B W
 * W W W
 * W W W
 * B B B
 * 
 * Becomes
 * 
 * B B G
 * G G G
 * G G G
 * B B B
 */

/**
 * In the form (y, x)
 */
type ImageMatrix = string[][];

type RowCol = number[];

const getOffsets = (): number[][] => {
    const deltas = [];
    for (let r = -1; r <= 1; r++) {
        for (let c = -1; c <= 1; c++) {
            deltas.push([r, c]);
        }
    }
    return deltas;
}

/**
 * Returns a matrix filled with false
 */
const newVisited = (yLen: number, xLen: number) => [...Array(yLen)]
    .map(e => Array(xLen).fill(false));

/**
 * True when within bounds
 */
const withinBounds = (image: ImageMatrix, y: number, x: number): boolean =>
    y > -1 &&
    y < image.length &&
    x > -1 &&
    x < image[0].length;

/**
 * Has every pixel been vistied?
 */
const visitedAll = (visited: boolean[][]): boolean => {
    const rows = visited.map(y => y.every(x => x === true));
    return rows.every(elem => elem === true);
}

/**
 * Replaces the color of the pixel specified in pixelYX and all adjacent same colored pixels.
 */
const replaceColor = (image: ImageMatrix, pixelYX: RowCol, toColor: string): ImageMatrix => {
    const offsets = getOffsets();
    const fromColor = image[pixelYX[0]][pixelYX[1]];
    const MAX_DEPTH = 15; // Abort when greater

    // Initialize to false
    const visited = newVisited(image.length, image[0].length);

    const pretty = (row: number, col: number, color: string): string =>
        `(${row},${col}): ${color}${color === fromColor ? ` replaced with ${toColor}` : ''}`;

    /**
     * Helper func that is called recurrsively. Mutates the image matrix in-place, replacing
     * adjacent pixels whose color is fromColor.
     */
    const replaceHelper = (y: number, x: number, depth: number) => {
        // console.log(`[depth: ${depth}] replaceHelper(${y}, ${x})`);
        if (depth > MAX_DEPTH) {
            return; // abort
        }

        if (visitedAll(visited)) {
            // console.log('Visited all pixels', visited);
            return;
        }

        visited[y][x] = true;
        //console.log(`\tvisit${pretty(y, x, image[y][x])}`);
        if (image[y][x] === fromColor) {
            image[y][x] = toColor;
        }

        // Recurse through all adjacent pixels that haven't been visited
        offsets.forEach(offset => {
            const [adjacentY, adjacentX] = [y + offset[0], x + offset[1]];
            if (withinBounds(image, adjacentY, adjacentX) && !visited[adjacentY][adjacentX]) {
                replaceHelper(adjacentY, adjacentX, depth + 1);
            }
        })
    }

    replaceHelper(pixelYX[0], pixelYX[1], 0);
    return image;
}

/**
 * ASSERTIONS
 */
console.log(visitedAll(newVisited(4, 6)) === false);
console.log(visitedAll([[false, true], [true, false]]) === false);
console.log(visitedAll([[true, true], [true, true]]) === true);

const TEST_IMAGE = [
    ['B', 'B', 'W'],
    ['W', 'W', 'W'],
    ['W', 'W', 'W'],
    ['B', 'B', 'B']];

console.log(withinBounds(TEST_IMAGE, 3, 3) === false);
console.log(
    JSON.stringify(
        replaceColor(TEST_IMAGE, [2, 2], 'G')
    ) === `[["B","B","G"],["G","G","G"],["G","G","G"],["B","B","B"]]`
);
