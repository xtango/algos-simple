/**
 *                        068 - COUNT PAIRS OF ATTACKING BISHOPS 
 *
 * !todo: WORK IN PROGRESS. MUST ADD MORE TEST CASES
 *
 * This problem was asked by Google.
 * 
 * On our special chessboard, two bishops attack each other if they share the same diagonal.
 * This includes bishops that have another bishop located between them, 
 * i.e. bishops can attack through pieces.
 *
 * You are given N bishops, represented as (row, column) tuples on a M by M chessboard.
 * Write a function to count the number of pairs of bishops that attack each other. 
 * The ordering of the pair doesn't matter: (1, 2) is considered the same as (2, 1).
 * 
 * For example, given M = 5 and the list of bishops:
 * (0, 0)
 * (1, 2)
 * (2, 2)
 * (4, 0)
 * The board would look like this:
 * [b 0 0 0 0]
 * [0 0 b 0 0]
 * [0 0 b 0 0]
 * [0 0 0 0 0]
 * [b 0 0 0 0]
 * You should return 2, since bishops 1 and 3 attack each other, as well as bishops 3 and 4.
 * 
 * SOLUTION
 * a. onDiagonal() checks if on the same "line".
 * b. countAttacks() uses a visited matrix to check pairs so that we don't double count.
 */

type Square = number[]; // [y, x] coordinates
type Board = Square[]; // 2D array of [y,x] coordinates

/**
 * Returns the num of pairs that can attack
 */
const countAttacks = (bishops: Board): number => {
    
    // Matrix of -1 (not visited), 0 (not on diag), 1 (on diag)
    // indexed on bishop indices
    const visited: number[][] = new Array(bishops.length)
        .fill(new Array(bishops.length).fill(-1));

    let count = 0;

    for (let i = 0; i < bishops.length; i++) {
        for (let j = 0; j < bishops.length; j++) {
            if (i !== j && visited[i][j] === -1 && visited[j][i] === -1) {
                const canAttack = onDiagonal(bishops[i], bishops[j]) ? 1 : 0;
                // Set pair: Bishop 1 can attack Bishop 2 implies the 2 can attack 1.
                [visited[i][j], visited[j][i]] = [canAttack, canAttack];
                count++
            }
        }
    }
    console.log(`Visited matrix\n${visited.join('\n')}`);
    console.log('Count attackable pairs', count);
    return count;
}

/**
 * Since bishops can attack through other pieces, it's sufficient to check
 * if a and b are on the same diagonal line.
 * 
 * y1 = m1*x1 + b1 and y2 = m2*x2 + b2 
 * When on diagonal, m1 = m2 and b1 = b2 and simplifying yields |y1 - y2| = |x1 - x2]
 */
const onDiagonal = (a: Square, b: Square): boolean => Math.abs(a[0] - b[0]) === Math.abs(a[1] - b[1]);

/**
 * ASSERTIONS
 */
console.log(onDiagonal([0,0],[2,2]));
console.log(onDiagonal([1,2],[0, 3]));
console.log(!onDiagonal([0,2],[0, 3]));
console.log(countAttacks([[0, 0], [1, 2], [2, 2], [4, 0]]) === 2);
