/**
 *          #168 [Medium] - ROTATE MATRIX
 * Given an N by N matrix, rotate it by 90 degrees clockwise.

For example, given the following matrix:

[[1, 2, 3],
 [4, 5, 6],
 [7, 8, 9]]
you should return:
[[7, 4, 1],
 [8, 5, 2],
 [9, 6, 3]]

Follow-up: What if you couldn't use any extra space?
 */

/**
 *        tmp ----
 *        /       | e      Move 4 at a time:
 *     a /        v         step a: top left to temp
 *    (0, 0)    (0, 2)      step b: move bottom left to top
 *       ^         |        step c: move bottom right to bottom left
 *     b |         | d      step d: move top right to bottom right
 *       |         v        step e: copy temp to top right
 *    (2, 0)<----(2, 2)
 *            c
 */

const pretty = (mat: number[][]): string => '\n' + mat.map(r => r.join(' ')).join('\n');

const rotateInPlace = (mat: number[][]): number[][] {
    console.log(pretty(mat));

    // i is the outer 
    // ----------------
    // | 1   2  3   4 |
    // |   --------   |<---- track
    // | 5 | 6  7 | 8 | 
    // | ...      |<------------- track

    // i is the track
    const tracks = mat.length >> 1;
    for (let i = 0; i < tracks; i++) {
        const jMax = mat.length - 1 - (i * 2);
        for (let j = 0; j < jMax; j++) {
            console.log({ i, j, jMax });
            const tmp = mat[i][j];          // step a
            mat[i][j] = mat[jMax][i];       // step b
            mat[jMax][i] = mat[jMax][jMax]; // step c
            mat[jMax][jMax] = mat[i][jMax]; // step d
            mat[i][jMax] = tmp;
            console.log(pretty(mat));
        }
    }
    return mat;
}

console.log(pretty(rotateInPlace(
    [[1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]])));
