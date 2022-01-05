/**
                    Problem #473 [Medium] - REVERSE DIRECTED GRAPH

This problem was asked by Yahoo.

Write an algorithm that computes the reversal of a directed graph. 
For example, if a graph consists of A -> B -> C, it should become A <- B <- C.
*/

/**
 * Dictionary of node to adjacent nodes
 */
type DG = { [id: string]: string[] }

const reverseDG = (g: DG) => {
    // Initialize new graph
    const newGraph: DG = {};
    Object.keys(g).forEach(g => newGraph[g] = []);

    // Add to new graph
    Object.entries(g).forEach(([node, adjNodes]) => {
        adjNodes.forEach(adjNode => newGraph[adjNode].push(node));
    });
    return newGraph;
}

const pretty = (g: DG) => JSON.stringify(g);

/**
 * ASSERTIONS
 */
console.log(pretty(reverseDG({
    'A': ['B'],
    'B': ['C'],
    'C': []
})) === `{"A":[],"B":["A"],"C":["B"]}`);

console.log(pretty(reverseDG({
    'A': ['B', 'C'],
    'B': ['C'],
    'C': []
})) === `{"A":[],"B":["A"],"C":["A","B"]}`);
