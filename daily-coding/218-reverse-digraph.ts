/**
 *                              #218 [Medium] - REVERSE DIRECTED GRAPH
 * 
 * This problem was asked by Yahoo.
 * 
 * Write an algorithm that computes the reversal of a directed graph. 
 * For example, if a graph consists of A -> B -> C, it should become A <- B <- C.
 */
type IncidentMatrix = number[][];

const newMatrix = (len: number): IncidentMatrix =>
    [...Array(len).keys()] // Equivalent to range(0, len)
        .map(x => new Array(len));

/**
 * @see https://en.wikipedia.org/wiki/Transpose_graph
 */
const reverseDigraph = (M: IncidentMatrix): IncidentMatrix => {
    const reversed = newMatrix(M.length);
    for (let r = 0; r < M.length; r++) {
        for (let c = 0; c < M.length; c++) {
            reversed[r][c] = M[c][r];
        }
    }
    return reversed;
}

/**
 * ASSERTIONS
 */
// A -> B -> C should become A <- B <- C.
console.log(JSON.stringify(
    reverseDigraph(
        [
    /*                    Reversed */
    /*      A  B  C       A  B  C  */
    /* A */[0, 1, 0], // [0, 0, 0]
    /* B */[0, 0, 1], // [1, 0, 0]
    /* C */[0, 0, 0]] // [0, 1, 0]
    )
) === '[[0,0,0],[1,0,0],[0,1,0]]');

// Example in Wikipedia @see https://en.wikipedia.org/wiki/Transpose_graph
console.log(JSON.stringify(
    reverseDigraph(
        [
    /*                            Reversed    */
    /*      A  B  C  D  E       A  B  C  D  E */
    /* A */[0, 1, 0, 0, 0], // [0, 0, 1, 0, 0]
    /* B */[0, 0, 1, 0, 0], // [1, 0, 0, 0, 0]
    /* C */[1, 0, 0, 0, 1], // [0, 1, 0, 0, 0]
    /* D */[0, 0, 0, 0, 1], // [0, 0, 0, 0, 1]
    /* E */[0, 0, 0, 1, 0]] // [0, 0, 1, 1, 0] 
    )) === '[[0,0,1,0,0],[1,0,0,0,0],[0,1,0,0,0],[0,0,0,0,1],[0,0,1,1,0]]');
