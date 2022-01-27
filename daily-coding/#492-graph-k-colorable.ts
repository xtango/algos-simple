/**
 *                  Problem #492 [Medium]       IS GRAPH K-COLORABLE?
 *
 * This problem was asked by Google.
 *
 * Given an undirected graph represented as an adjacency matrix and an integer k, 
 * write a function to determine whether each vertex in the graph can be colored
 * such that no two adjacent vertices share the same color using at most k colors.
 */

type AdjacentyMatrix = number[][];

const pretty = (depth: number, visitedVertices: number[]) =>
    `[depth ${depth}] ${visitedVertices.map(c => ['R', 'G', 'B', 'P', 'Y'][c]).join('')}`;

/**
 *  starting from vertex 0 we start coloring the vertices
 *  and storing int in coloredVertices
 *
 *     GRAPH              DFS RECURSION TREE     
 *                               v0   
 *     v0 --v1               R / G| \B
 *      |  /                 /    |  \
 *     v2                  v1     v1  v2
 *                    R!/  G|   
 *                          |  
 *                         v2    
 *                    R!/G!|\B <---- Valid (Path: v0:R, v1: G, v2: B)
 * 
 *                   where ! represents  INVALID
 */
const isKColorable = (matrix: AdjacentyMatrix, k: number): boolean => {
    /**
     * @param visitedVertices // Stores colors in the order of each vertex idx
     */
    const helper = (visitedVertices: number[], depth: number = 0): boolean => {
        // console.log(pretty(depth, visitedVertices));

        // Base Case: We've successfully colored all vertices
        if (visitedVertices.length === matrix.length) {
            return true;
        }
        if (depth > 10) {
            console.error('Aborted');
        }

        for (let color = 0; color < k; color++) {
            // Visit
            visitedVertices.push(color);
            // Skip if invalid color. Otherwise recurse.
            if (isValidColor(matrix, visitedVertices)) {
                if (helper(visitedVertices, depth + 1)) {
                    return true;
                }
            }
            visitedVertices.pop();
        }
        return false;
    }

    return helper([]);
}

/**
    * Checks the last vertex in visitedVeritces. Returns false if 
    * adjacent veritcs share the same color. Ignores unvisited vertices.
    */
const isValidColor = (matrix: number[][], coloredVertices: number[]): boolean => {
    const lastVisitedIdx = coloredVertices.length - 1;
    for (let i = 0; i < coloredVertices.length; i++) {
        const isNeighbor = i !== lastVisitedIdx && matrix[lastVisitedIdx][i] === 1;
        if (isNeighbor && coloredVertices[i] === coloredVertices[lastVisitedIdx]) {
            return false;
        }
    }
    return true;
}

/**
 * ASSERTIONS
 */

/**
 *  Test 1
 *      0 -- 1
 *      |  / 
 *      2   
 */
const MATRIX_1 = [
   /*      0  1  2 */
   /* 0 */[0, 1, 1],
   /* 1 */[1, 0, 1],
   /* 2 */[1, 1, 0]
];
console.log(isValidColor(MATRIX_1, [1, 3]));
console.log(!isValidColor(MATRIX_1, [1, 1]));
console.log(isValidColor(MATRIX_1, [1, 3, 5]));
console.log(!isValidColor(MATRIX_1, [1, 3, 1]));
console.log(!isKColorable(MATRIX_1, 2));
console.log(isKColorable(MATRIX_1, 3));

/**
 *  Test 2
 *      3
 *   /  |  \
 *  |   0 -- 1
 *   \  |  / 
 *      2   
 */
const MATRIX_2 = [
   /*      0  1  2  3 */
   /* 0 */[0, 1, 1, 1],
   /* 1 */[1, 0, 1, 1],
   /* 2 */[1, 1, 0, 1],
   /* 3 */[1, 1, 1, 0],
]
console.log(isKColorable(MATRIX_2, 2) === false);
console.log(isKColorable(MATRIX_2, 3) === false);
console.log(isKColorable(MATRIX_2, 4) === true);
