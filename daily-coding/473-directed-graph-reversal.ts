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

const reverseDG = (g: DG): DG => {
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

const googleChartURL = (g: DG) => {
    const params = Object.entries(g)
        .map(([node, adjNodes]) => `${adjNodes.length ? node + '->' + adjNodes.join(',') : ''}`)
        .filter(x=> x !== '')
        .join(';');
    return `https://chart.googleapis.com/chart?cht=gv&chl=digraph{${params}}&`
}

/**
 * ASSERTIONS
 */
const DG1 = {
    'A': ['B'],
    'B': ['C'],
    'C': []
};
console.log(pretty(reverseDG(DG1)) === `{"A":[],"B":["A"],"C":["B"]}`);
console.log(googleChartURL(DG1));
console.log(googleChartURL(reverseDG(DG1)));

const DG2 = {
    'A': ['B', 'C'],
    'B': ['C'],
    'C': []
};
console.log(pretty(reverseDG(DG2)) === `{"A":[],"B":["A"],"C":["A","B"]}`);
console.log(googleChartURL(DG2));
console.log(googleChartURL(reverseDG(DG2)));
