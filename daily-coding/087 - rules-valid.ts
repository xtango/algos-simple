/**
 * #87 - RULES VALID? This problem was asked by Uber.
 * 
 * A rule looks like this:
 * 'A NE B' This means this means point A is located northeast of point B.
 * 'A SW C' means that point A is southwest of C.
 *
 * Given a list of rules, check if the sum of the rules validate. For example:
 * A N B
 * B NE C
 * C N A
 * does not validate, since A cannot be both north and south of C.
 *
 * A NW B
 * A N B
 * is considered valid.
 *
 * METHODOLOGY
 * We use a graph, whose edges weights represent directions.
 * On adding a rule, we check if edge weights contradict existing weights.
 *
 * @example: validRule(['A S B', 'B S A']) -> false
 * Rule 1: 'A S B', A is south of B, gives graph1 = {
 *		           A: edges: { B: {y: 1, x: undefined}}  // A is south of B
 *		           B: edges: { A: {y: -1, x: undefined}} // B is north of A
 *		        }
 *               B
 *       south |   ^
 *   	         v   | north
 *               A
 * Rule 2: 'B S A' gives graph2 = {A: edges: {y: 0, x: 0}, B: {y: 1}}
 *         which contradicts rule 1: graph1.B.y != graph2..B.y
 *
 */
 
 /**
  * Parse rules that are in the form <from> <direction> <to>.
  */
