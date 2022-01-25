/**
Problem #492 [Medium]

Given an undirected graph represented as an adjacency matrix and an integer k, 
write a function to determine whether each vertex in the graph can be colored
such that no two adjacent vertices share the same color using at most k colors.
 */

const noColorSharing = (matrix: number[][], k: number): boolean => {
    // starting from vertex 0
    for (let i =0; i < matrix.)
}

/**
 * ASSERTIONS
 */

/**
 *  Test 1
 *      3
 *   /  |  \
 *  |   0 -- 1
 *   \  |  / 
 *      2   
 */
const MATRIX_1 = [
   /*      0  1  2  3 */
   /* 0 */[0, 1, 1, 1],
   /* 1 */[1, 0, 1, 1],
   /* 2 */[1, 1, 0, 1],
   /* 3 */[1, 1, 1, 0],
]
console.log(noColorSharing(MATRIX_1, 2) === false);
console.log(noColorSharing(MATRIX_1, 3) === false);
console.log(noColorSharing(MATRIX_1, 4) === true);
