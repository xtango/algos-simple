/**
 * #87 - RULES VALID? This problem was asked by Uber.
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
 *
 */
interface DestinationDirection { [key: string]: { y: number; x: number } }

interface GraphNode {
    edges: DestinationDirection;
}

interface Graph { [key: string]: GraphNode }

const DIRECTION: DestinationDirection = {
    'N': { y: -1, x: 0 },
    'S': { y: 1, x: 0 }
}

/**
 * Parse rules that are in the form <from> <direction> <to>.
 * Create nodes if they don't exist.
 * @example: isValid(['A S B', 'B S A']) -> false
 *           Rule 1: 'A S B', A is south of B, gives edges1 = {
 *		           A: { B: {y: 1, x: undefined} }   // A is south of B
 *		           B: { A: {y: -1, x: undefined}}}  // B is north of A
 *
 *                     B
 *             south |   ^
 *   	             v   | north
 *                     A
 *          Rule 2: 'B S A' gives edges2 = {A: {y: 0, x: 0}, B: {y: 1}}
 *          which contradicts rule 1: graph1.B.y != graph2..B.y
 * 
 * @returns False if a rule is inconsistent with another rule.
 */
const isValid = (rules: string[]): boolean => {
    const graph: Graph = {};

    const createNodesWhenNotExists = (start: string, dest: string) => {
        if (!graph[start]) {
            graph[start] = { edges: {} }
        }
        if (graph[dest] === undefined) {
            graph[dest] = { edges: {} }
        }
    }

    /**
     * Set edge soure to target and vice versa.
     */
    const addEdges = (start: string, dest: string, dir: string): void => {
        graph[start].edges[dest] = DIRECTION[dir];
        graph[dest].edges[start] = { y: DIRECTION[dir].y * -1, x: DIRECTION[dir].x * -1};
    }

    /**
     * Adds a rule
     */
    const add = (rule: string) => {
        const tokens = rule.split(' ');
        const [start, dir, target] = [tokens[0], tokens[1], tokens[2]];
        createNodesWhenNotExists(start, target);
        addEdges(start, target, dir);

        console.log('graph: ', graph);
        return true;
    }

    return rules.every(r => add(r))
}

/**
 * Tests
 */
console.log(isValid(['A S B']);
//console.log(isValid(['A S B', 'B S A']));
