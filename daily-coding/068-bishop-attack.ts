/**
 *                        068 - BISHOP PAIRS - !!!!!!! WORK IN PROGRESS. GIVES WRONG RESULTS BECAUSE OF COUNTING ITSELF !!!
 *
 * This problem was asked by Google.
 * Count Pairs of attacking bishop pairs
 * This problem was asked by Google.
 * 
 * On our special chessboard, two bishops attack each other if they share the same diagonal.
* This includes bishops that have another bishop located between them, i.e. bishops can attack through pieces.
* You are given N bishops, represented as (row, column) tuples on a M by M chessboard.
* Write a function to count the number of pairs of bishops that attack each other. 
* The ordering of the pair doesn't matter: (1, 2) is considered the same as (2, 1).
* 
* For example, given M = 5 and the list of bishops:
* (0, 0)
* (1, 2)
* (2, 2)
(4, 0)
* The board would look like this:

* [b 0 0 0 0]
* [0 0 b 0 0]
* [0 0 b 0 0]
* [0 0 0 0 0]
* [b 0 0 0 0]
* You should return 2, since bishops 1 and 3 attack each other, as well as bishops 3 and 4.
*/

/**
 * 2D array of (y, x) coordinates
 */
type Square = number[];
type Board = Square[];

/**
 * Returns the num of pairs that can attack
 */
const countAttacks = (bishops: Board): number => {

    // Matrix of bishop indices
    const visited: boolean[][] = new Array(bishops.length)
        .fill(new Array(bishops.length).fill(false));

    let count = 0;

    for (let i = 0; i < bishops.length; i++) {
        for (let j = 0; j < bishops.length; j++) {
            if (!visited[i][j] && !visited[j][i]
                && onDiagonal(bishops[i], bishops[j])) {
                [visited[i][j], visited[j][i]] = [true, true];
                count++
            }
        }
    }
    console.log('count', count);
    return count;
}

/**
 * y1 = m1 x1 + b1 and y2 = m2 x1 + b2 
 * When on diagonal, m1 = m2 and b1 = b2. Simplifying yields:
 * |y1 - y2| = |x1 -x2]
 */
const onDiagonal = (a: Square, b: Square): boolean => Math.abs(a[0] - b[0]) === Math.abs(a[1] - b[1]);

/**
 * ASSERTIONS
 */
// console.log(onDiagonal([0,0],[2,2]));
// console.log(onDiagonal([1,2],[0, 3]));
// console.log(!onDiagonal([0,2],[0, 3]));
// console.log(countAttacks([[0, 0], [1, 2], [2, 2], [4, 0]]) === 2);
