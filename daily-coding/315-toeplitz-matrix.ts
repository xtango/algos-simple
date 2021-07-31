/**
 *                           Problem #315 [Easy] - IS TOEPLITZ MATRIX
 * 
 * This problem was asked by Google.
 * 
 * In linear algebra, a Toeplitz matrix is one in which the elements on any
 * given diagonal from top left to bottom right are identical.
 * 
 * Here is an example:
 * 1 2 3 4 8
 * 5 1 2 3 4
 * 4 5 1 2 3
 * 7 4 5 1 2
 * 
 * Write a program to determine whether a given input is a Toeplitz matrix.
 */

/**
 * Return true when diagonal-constant, i.e. A(r,c) = A(r+1,c+1) = a(r-c)
 * 
 * In the problem statement's example, we check 1=1, 5=5, 4=4 etc
 * 
 *      iter1 -> iter2 -> iter3 .... etc
 *      1 2      5 1      4 5
 *      5 1      4 5      7 4
 */
const isToeplitz = (A: number[][]): boolean => {
    const [rowLen, colLen] = [A.length, A[0].length];

    for (let c = 0; c < colLen - 1; c++) {
        for (let r = 0; r < rowLen - 1; r++) {
            console.log(`(${r},${c}): ${A[r][c]}, ${A[r + 1][c + 1]}`);
            if (A[r][c] !== A[r + 1][c + 1]) {
                return false;
            }
        }
    }
    return true;
}

/**
 * ASSERTIONS
 */
console.log(isToeplitz([
    [1, 2, 3, 4, 8],
    [5, 1, 2, 3, 4],
    [4, 5, 1, 2, 3],
    [7, 4, 5, 1, 2]]) === true);

console.log(isToeplitz([
    [1, 2, 3, 4, 8],
    [7, 1, 2, 3, 4],
    [4, 5, 1, 2, 3],
    [7, 4, 5, 1, 2]]) === false);
