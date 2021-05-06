/**
 *              Problem #226 [Hard] - LETTER ORDER
 * 
 * This problem was asked by Airbnb.
 * 
 * You come across a dictionary of sorted words in a language you've never seen before.
 * Write a program that returns the correct order of letters in this language.
 * 
 * For example, given ['xww', 'wxyz', 'wxyw', 'ywx', 'ywz'], you should return 
 * ['x', 'z', 'w', 'y'].
 */
type Pair = string[];

type Graph = { [key: string]: string[] };

const adjacentPairs = (words: string[]): Pair[] => {
    const pairs = [];
    for (let i = 1; i < words.length; i++) {
        pairs.push([words[i - 1], words[i]]);
    }
    return pairs;
}

/**
 * For the adjacent words pair returns a list of the i'th char of left and right
 * 
 * @example ['xww', 'wxyz'] returns [[x, w], [w, x], [w, y]]
 */
const zipChars = (pair: Pair): Pair[] => {
    const zipped = [];
    for (let i = 0; i < Math.min(pair[0].length, pair[1].length); i++) {
        zipped.push([pair[0][i], pair[1][i]]);
    }
    return zipped;
}

const pairsToGraph = (pairs: Pair[]): Graph => {
    const graph: Graph = {};
    pairs.forEach(pair => {
        const charPairs = zipChars(pair);
        for (let i = 0; i < charPairs.length; i++) {
            const [left, right] = [charPairs[i][0], charPairs[i][1]];
            if (left !== right) {
                if (graph[left] === undefined) {
                    graph[left] = [];
                }
                graph[left].push(right);
                break;
            }
        }
    })
    return graph;
}

const letterOrder = (words: string[]) => {
    const graph = pairsToGraph(adjacentPairs(words));
    console.log(graph);
}

/**
 * ASSERTIONS
 */
console.log(JSON.stringify(adjacentPairs(['a', 'b', 'c', 'd'])) === '[["a","b"],["b","c"],["c","d"]]');
console.log(JSON.stringify(zipChars(['xww', 'wxyz'])) === '[["x","w"],["w","x"],["w","y"]]');
const WORDS = ['xww', 'wxyz', 'wxyw', 'ywx', 'ywz'];
console.log(JSON.stringify(pairsToGraph(adjacentPairs(WORDS))) === '{"x":["w","z"],"z":["w"],"w":["y"]}');
// letterOrder(['xww', 'wxyz', 'wxyw', 'ywx', 'ywz']);
