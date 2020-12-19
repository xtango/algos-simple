/**
 * #87 RULES VALID? This problem was asked by Uber.
 * 
 * A rule looks like this:
 *      'A NE B' This means this means point A is located northeast of point B.
 *      'A SW C' means that point A is southwest of C.
 * Given a list of rules, check if the sum of the rules validate. For example:
 *      A N B
 *      B NE C
 *      C N A
 * does not validate, since A cannot be both north and south of C.
 *      A NW B
 *      A N B
 *      is considered valid.
 *
 * METHODOLOGY
 * We use a graph with edges weights representing directions.
 * On adding a rule, we check if edge weights contradict existing weights.
 */

interface DestDirection { [key: string]: { y: number; x: number } }
interface GraphNode { edges: DestDirection; }
interface Graph { [key: string]: GraphNode }

/**
 *  ---> X
 *  |
 *  v Y
 */
const DEST_OFFSET: DestDirection = {
    'N': { y: -1, x: 0 },
    'NE': { y: -1, x: 1 },
    'NW': { y: -1, x: -1 },
    'E': { y: 0, x: 1 },
    'S': { y: 1, x: 0 },
    'SE': { y: 1, x: 1 },
    'SW': { y: -1, x: -1 },
    'W': { y: 0, x: -1 },
}

/**
 * Parses rule in the form <from> <direction> <to>.
 */
const tokenize = (rule: string) => {
    const tokens = rule.split(' ');
    return [tokens[0], tokens[1], tokens[2]];
}

/**
 * Create nodes and edges and compares existing edge weights.
 * @example: isValid(['A S B', 'B S A']) -> false
 *           Rule 1: 'A S B', A is south of B, gives edges1 = {
 *		             A: { B: {y: 1, x: undefined} }   // A is south of B
 *		             B: { A: {y: -1, x: undefined}}}  // B is north of A
 *           Rule 2: 'B S A' gives edges2 = {A: {y: 0, x: 0}, B: {y: 1}}
 *                   which contradicts rule 1: graph1.B.y != graph2..B.y
 * 
 * @returns False if a rule is inconsistent with another rule.
 */
const isValid = (rules: string[]): boolean => {
    const graph: Graph = {};

    const createNode = (key: string) => {
        graph[key] = { edges: {} }
    }

    const addEdge = (start: string, dest: string, y: number, x: number): void => {
        graph[start].edges[dest] = { y, x };
    }

    /**
     * Todo: Must improve by checking that every node from start to destination
     */
    const sameDirection = (start: string, dest: string, dir: string): boolean => {
        const edge = graph[start].edges[dest];
        const offset = DEST_OFFSET[dir];
        return (edge === undefined)
            ? true
            : (edge.y * offset.y) !== -1 && (edge.x * offset.x) !== -1;
    }

    /**
     * Adds a rule
     */
    const add = (rule: string) => {
        console.log(`[add] ${rule}`);
        const [start, dir, dest] = tokenize(rule);

        [start, dest].forEach(node => {
            if (!graph[node]) {
                createNode(node);
            }
        });

        let valid = true;
        if (sameDirection(start, dest, dir)) {
            addEdge(start, dest, DEST_OFFSET[dir].y, DEST_OFFSET[dir].x);
            addEdge(dest, start, DEST_OFFSET[dir].y * -1, DEST_OFFSET[dir].x * -1);
        } else {
            valid = false;
        }
        //console.log('[add rule] valid, graph', valid, graph);
        return valid;
    }

    console.log(`\nVALIDATE RULE [ ${rules.map(x => `'${x}'`).join(', ')} ]`);
    return rules.every(r => add(r))
}

/**
 * Tests
 */
console.log(isValid(['A S B']) === true ? 'passed' : 'failed');

console.log(isValid(['A S B', 'B S A']) === false ? 'passed' : 'failed');

/**
 *   C
 *    \
 *      A
 *     /
 *   B
 */
console.log(isValid(['A NE B', 'A SW C']) === true ? 'passed' : 'failed');

console.log(isValid(['A NW B', 'A N B']) === true ? 'passed' : 'failed');
