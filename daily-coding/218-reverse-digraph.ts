/**
 *                              #218 [Medium] - REVERSE DIRECTED GRAPH
 * 
 * This problem was asked by Yahoo.
 * 
 * Write an algorithm that computes the reversal of a directed graph. 
 * For example, if a graph consists of A -> B -> C, it should become A <- B <- C.
 */
type IncidentMatrix = number[][];

const newMatrix = (len: number): IncidentMatrix => [...Array(len).keys()].map(x => new Array(len));

const reverseDigraph = (M: IncidentMatrix): IncidentMatrix => {
    const len = M.length;
    const reversed = newMatrix(len);
    for (let r = 0; r < len; r++) {
        for (let c = 0; c < len; c++) {
            reversed[r][c] = M[c][r];
        }
    }
    return reversed;
}

/**
 * ASSERTIONS
 */

// A -> B -> C should become A <- B <- C.
const DIGRAPH_1: IncidentMatrix = [
    /*                    Reversed */
    /*      A  B  C       A  B  C  */
    /* A */[0, 1, 0], // [0, 0, 0]
    /* B */[0, 0, 1], // [1, 0, 0]
    /* C */[0, 0, 0] //  [0, 1, 0]
];
console.log(JSON.stringify(reverseDigraph(DIGRAPH_1)) === '[[0,0,0],[1,0,0],[0,1,0]]');
