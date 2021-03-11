/**
 *          #168 [Medium] - ROTATE MATRIX
 * 
 * Given an N by N matrix, rotate it by 90 degrees clockwise.
 * For example, given the following matrix:
 * [[1, 2, 3],
 * [4, 5, 6],
 * [7, 8, 9]]
 * you should return:
 * [[7, 4, 1],
 * [8, 5, 2],
 * [9, 6, 3]]
 *
 * Follow-up: What if you couldn't use any extra space?
 */

/**
 *        tmp ----
 *        /       | e      Move 4 at a time.
 *     a /        v        
 *    (0, 0)    (0, 2)     
 *       ^         |    
 *     b |         | d  
 *       |         v    
 *    (2, 0)<----(2, 2)
 *            c
 */

const pretty = (mat: number[][]): string => '\n' + mat.map(r => r.join(' ')).join('\n');

/**
 * In-place rotate by 90 degrees, moving 4 cells at a time.
 */
const rotateInPlace = (mat: number[][]): number[][] => {
    //console.log('ROTATE', pretty(mat));

    // ----------------
    // | 1   2  3   4 |
    // |   --------   |<---- track
    // | 5 | 6  7 | 8 | 
    // | ...      |<------------- track

    const N = mat.length;
    const tracks = mat.length >> 1;
    for (let r = 0; r < tracks; r++) {
        for (let c = r; c < N - r - 1; c++) {
            const tmp = mat[r][c];          // step a
            // step b: Top left from bottom left
            mat[r][c] = mat[N - c - 1][r];

            // step c: Bottom left from bottom right
            mat[N - c - 1][r] = mat[N - r - 1][N - c - 1];

            // step d: Bottom right from top right
            mat[N - r - 1][N - c - 1] = mat[c][N - r - 1];

            // step e: Top right from temp
            mat[c][N - r - 1] = tmp;
        }
        //console.log('r', r, pretty(mat));
    }
    return mat;
}
/**
 * ASSERTIONS
 */
console.log(
    pretty(rotateInPlace([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]]))
    == pretty([
        [7, 4, 1],
        [8, 5, 2],
        [9, 6, 3]]));

console.log(
    pretty(rotateInPlace([
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
        [13, 14, 15, 16]]))
    == pretty([
        [13, 9, 5, 1],
        [14, 10, 6, 2],
        [15, 11, 7, 3],
        [16, 12, 8, 4]
    ]));
