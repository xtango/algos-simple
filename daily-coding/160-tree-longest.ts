/**
 *                      LONGEST PATH
This problem was asked by Uber.

Given a tree where each edge has a weight, compute the length of the longest path in the tree.

For example, given the following tree:

   a
  /|\
 b c d
    / \
   e   f
  / \
 g   h
and the weights: a-b: 3, a-c: 5, a-d: 8, d-e: 2, d-f: 4, e-g: 1, e-h: 1, the longest path would be c -> a -> d -> f, with a length of 17.

The path does not have to pass through the root, and each node can have any amount of children.
*/

type Weights = number[][];

const adjs = (weights: Weights, i: number) => weights[i]
    .map((x, idx) => x > 0 ? idx : -1)
    .filter(y => y > -1);

const MAX_DEPTH = 10;

const longestPath = (weights: Weights) => {
    const visited: { [key: string]: boolean } = {};
    const makeKey = (from: number, to: number) => `${from}->${to}`;
    const hasVisited = (from: number, to: number) => !visited[makeKey(from, to)] && !visited[makeKey(to, from)]
    const visit = (from: number, to: number) => {
        visited[makeKey(from, to)] = true;
        visited[makeKey(to, from)] = true;
    }

    // Returns the max path accumulated weight`
    const traverse = (nodeIdx: number, depth: number = 0): number => {
        if (depth > MAX_DEPTH) {
            return -1; // abort
        }
        // visit each adjacent node and take the max weight
        let max = 0;
        adjs(weights, nodeIdx)
            .forEach(adj => {
                if (!hasVisited(nodeIdx, adj)) {
                    visit(nodeIdx, adj);
                    const wt = weights[nodeIdx][adj]
                    console.log(`[depth ${depth}] ${String.fromCharCode(nodeIdx + 97)}->${String.fromCharCode(adj + 97)}: wt: ${wt}`);
                    const accumWt = wt + traverse(adj, depth + 1);
                    max = Math.max(max, accumWt);
                    console.log(`...accum: ${accumWt}, max: ${max}`);
                }
            });
        return max;
    }

    traverse(0)
}

// a-b: 3, a-c: 5, a-d: 8, d-e: 2, d-f: 4, e-g: 1, e-h: 1
const WEIGHTS = [
    //      a  b  c
    /* a */[0, 3, 5],
    /* b */[3, 0, 0],
    /* c */[5, 0, 0]
];
longestPath(WEIGHTS)
