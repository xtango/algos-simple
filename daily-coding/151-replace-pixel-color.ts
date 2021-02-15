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
 * Becomes
 * 
 * B B G
 * G G G
 * G G G
 * B B B
 */

/**
 * (y, x)
 * 
 * --> x
 * |
 * v y
 */
type ImageMatrix = string[][];

type RowCol = number[];

const getOffsets = (): number[][] => {
    const deltas = [];
    for (let r = -1; r <= 1; r++) {
        for (let c = -1; c <= 1; c++) {
            if (!(r === 0 && c === 0)) {
                deltas.push([r, c]);
            }
        }
    }
    return deltas;
}

/**
 * Returns a matrix filled with undefined.
 */
const newMatrix = (len: number ) => [...Array(len)].map(e => Array(len));

/**
 * 
 */
const replace = (image: ImageMatrix, pixelRowCol: RowCol, toColor: string): ImageMatrix => {
    const offsets = getOffsets();
    const fromColor = image[pixelRowCol[0]][pixelRowCol[1]];
    const MAX_DEPTH = 2;
    const visited = newMatrix(image.length);

    console.log('vistied', visited);

    const withinBounds = (y: number, x: number): boolean =>
        y > -1 &&
        y < image.length &&
        x > -1 &&
        x < image.length;

    const pretty = (row: number, col: number, color: string): string =>
        `(${row},${col}): ${color}${color === fromColor ? `->${toColor}` : ''}`;

    /**
     * Helper func to be called recurrsively to do an in-place replace of 
     * adjacent pixels that have the same fromColor
     */
    const replaceHelper = (y: number, x: number, depth: number) => {
        console.log(`[depth: ${depth}] replaceHelper(${y}, ${x})`);
        visited[y][x] = true;
        if (depth > MAX_DEPTH) {
            return; // abort
        }
        offsets.forEach(offset => {
            const color = image[y][x];
            if (color === fromColor && color !== toColor) {
                image[y][x] = toColor;
            }

            const adjY = y + offset[0];
            const adjX = x + offset[1];
            if (withinBounds(adjY, adjX) && !visited[y][x]) {
                console.log(`\t\tadjacent=${pretty(adjY, adjX, color)}`);
                replaceHelper(adjY, adjX, depth + 1);
            }
        })
    }

    replaceHelper(pixelRowCol[0], pixelRowCol[1], 0);
    return image;
}


/**
 * ASSERTIONS
 */
replace([
    ['B', 'B', 'W'],
    ['W', 'W', 'W'],
    ['W', 'W', 'W'],
    ['B', 'B', 'B']],
    [2, 2],
    'G');
