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
 * We use a graph, whose edges weights represent directions.
 * On adding a rule, we check if edge weights contradict existing weights.
 *
 * @example: validRule(['A S B', 'B S A']) -> false
 *           Rule 1: 'A S B', A is south of B, gives edges1 = {
 *		           A: { B: {y: 1, x: undefined} }   // A is south of B
 *		           B: { A: {y: -1, x: undefined}}}  // B is north of A
 *
 *                   B
 *             south |   ^
 *   	             v   | north
 *                   A
 *          Rule 2: 'B S A' gives edges2 = {A: {y: 0, x: 0}, B: {y: 1}}
 *          which contradicts rule 1: graph1.B.y != graph2..B.y
 */
interface GraphNode {
    edges?: { [key: string]: { y: number; x: number } }
}

interface Graph { [key: string]: GraphNode }

/**
 * Parse rules that are in the form <from> <direction> <to>.
 * Create nodes if they don't exist.
 * 
 * @returns Invalid if a rule is inconsistent with an existing rule.
 */
const isValid = (rules: string[]): boolean => {
    const graph: Graph = {};

    const add = (rule: string) => {
        const tokens = rule.split(' ');
        console.log('rule tokens', tokens);
        const [source, dir, target] = [tokens[0], tokens[1], tokens[2]];


        if (graph[source] === undefined) {
            graph[source] = { }
        }
        if (graph[target] === undefined) {
            graph[target] = { }
        }
        console.log('graph: ', graph);
        return true;
    }

    return rules.every(r => add(r))
}

/**
 * Tests
 */

console.log(isValid(['A NE B']));

