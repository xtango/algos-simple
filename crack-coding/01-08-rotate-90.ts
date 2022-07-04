/**
 * Rotate 90 Degrees
 */

const blankMatrix = (N: number) => {
    var m = [];
    for (let i = 0; i < N; i++) {
        m[i] = new Array(N);
    }
    return m;
}
/**
 * Rotates an NxN matrix into a new matrix
 */
const rotate90 = (m: number[][]) => {
    const N = m.length;
    const m2 = blankMatrix(N);
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            m2[j][N - i - 1] = m[i][j];
        }
    }
    return m2;
}

const equals = (m1: number[][], m2: number[][]) => {
    if (m1.length !== m2.length) {
        return false;
    }
    for (let i = 0; i < m1.length; i++) {
        if (m1[i].length !== m2[i].length) {
            return false;
        }
        for (let j = 0; j < m1.length; j++) {
            if (m1[i][j] !== m2[i][j]) {
                return false;
            }
        }
    }
    return true;
}

/**
 * Assertions
 */

const M2 = [
    [1, 2],
    [3, 4]];
console.log(equals(rotate90(M2),
    [[3, 1],
    [4, 2]]));

const M3 = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]];
console.log(equals(rotate90(M3),
    [[7, 4, 1],
    [8, 5, 2],
    [9, 6, 3]]));
