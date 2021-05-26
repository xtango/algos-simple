/**
 *                                  #246 [Medium] - WORD CHAIN CIRCLE  (UNDER CONSTRUCTION)
 *
 * This problem was asked by Dropbox.
 * 
 * Given a list of words, determine whether the words can be chained to form a circle.
 * A word X can be placed in front of another word Y in a circle if the last character
 * of X is same as the first character of Y.
 * 
 * For example, the words 
 * ['chair', 'height', 'racket', touch', 'tunic'] can form the following circle:
 * chair --> racket --> touch --> height --> tunic --> chair
 */
type Graph = { [key: string]: { adjList: string[], outDegree: number, inDegree: number };

/**
 * Returns a graph containing the adjacency list of each word
 */
const newGraph = (words: string[]): Graph => {
    const g: Graph = {};
    words.forEach(w => {
        const adjList = words.filter(x => x[0] === w[w.length - 1]);
        g[w] = { 
            adjList,
            inDegree: 0, 
            outDegree: 0
        };
    });

    for (const [k, v] of Object.entries(g)) {
        v.outDegree = v.adjList.length;
        v.adjList.forEach(word => g[word].inDegree++);
    };
    
    return g;
}

/**
 * Return true when In = Out degree for each node.
 */
const degreesEqual = (g: Graph): boolean => Object
    .values(g)
    .every(d => d.inDegree === d.outDegree);

const connected = (g: Graph): boolean => true;

/**
 * Chainable when the graph of words has an Eulerain cycle
 * Both a and b must be satisfied:
 * a. In Degree equals Out Degree for each node.
 * b. Connected.
 */
const isEueler = (words: string[]): boolean => {
    const g = newGraph(words);
    return degreesEqual(g) && connected(g);
}

//     const MAX_DEPTH = 10;
//     const visited: string[] = [];

//     const bfs = (q: string[], depth: number): boolean => {
//         console.log(`[${depth}] q: ${JSON.stringify(q)}`);
//         if (q.length === 0 || depth > MAX_DEPTH) {
//             return false;
//         }

//         // Dequeue head
//         const word = q.shift();                              // word=chair, q=[] -> racket, []       ->  touch, [tunic]
//         visited.push(word);
//         console.log('\tword:', word);

//         const adjList = neighbors(wordList, word);
//         // .filter(x => !visited.includes(x)); // adjs=[racket]    -> [touch, tunic]   ->  [height]
//         if (adjList.includes(wordList[0])) {
//             return true;
//         }
//         q = q.concat(adjList);
//         console.log('\tadjList:', JSON.stringify(adjList));
//         return bfs(q, depth + 1);
//     }

//     console.log('wordList:', JSON.stringify(wordList));
//     return bfs([wordList[0]], 0);
// }

/**
 * ASSERTION
 */
const WORDS1 = ['chair', 'height', 'racket', 'touch', 'tunic'];
const graph1 = newGraph(WORDS1);
console.log(JSON.stringify(graph1));
console.log(degreesEqual(graph1));
// console.log(JSON.stringify(neighbors(WORDS1, 'height')) === '["touch","tunic"]');
// console.log(canFormChainCircle(WORDS1));

// // Test unchaninable
// // const WORDS2 = ['chair', 'height', 'racket', 'touch'];
// // console.log(canFormChainCircle(WORDS2));
