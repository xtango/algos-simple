/**
Problem #492 [Medium]       IS GRAPH K-COLORABLE?
Given an undirected graph represented as an adjacency matrix and an integer k, 
write a function to determine whether each vertex in the graph can be colored
such that no two adjacent vertices share the same color using at most k colors.
 */

/**
 *  starting from vertex 0 we start coloring the vertices
 *  and storing int in coloredVertices
 *
 *                                     0   
 *      0 -- 1                 /       |        \
 *      |  /               R /        G|         \B
 *      2                  1           1          1  
 *                    R!/ G | \B   R/ G!| \B   R / G | \B! 
 *                     ...          ....
 *                          
 *                   ! = INVALID
 */
const isKColorable = (matrix: number[][], k: number): boolean => {
    /**
     * Checks the last vertex in visitedVeritces. Returns false if 
     * adjacent veritcs share the same color. Ignores unvisited vertices.
     */
    const validColor = (visitedVertices: number[]): boolean => {
        const vertexIdx = visitedVertices.length - 1;
        for (let i = 0; i < visitedVertices.length; i++) {
            const isNeighbor = i !== vertexIdx && matrix[vertexIdx][i] === 1;
            if (isNeighbor && visitedVertices[i] === matrix[vertexIdx][i]) {
                return false;
            }
        }
        return true;
    }

    /**
     * @param coloredVerices // Corresponds to vertex number
     */
    const helper = (visitedVertices: number[]): boolean => {
        if (visitedVertices.length === matrix.length) {
            return true;
        }
        for (let color = 0; color < k; color++) {
            // Visit
            visitedVertices.push(color);
            // Skip if invalid color. Otherwise recurse.
            if (validColor(visitedVertices)) {
                if (helper(visitedVertices)) {
                    return true;
                }
            }
        }
        return false;
    }

    helper([]);

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
