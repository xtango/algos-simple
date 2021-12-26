/**
 *                          Problem #463 [Easy] - QUXES MERGE COLORS 
 * 
 * This problem was asked by Facebook.
 * 
 * On a mysterious island there are creatures known as Quxes which come in three colors:
 *      red, green, and blue. 
 * One power of the Qux is that if two of them are standing next
 * to each other, they can transform into a single creature of the third color.
 * Given N Quxes standing in a line, determine the smallest number of them remaining 
 * after any possible sequence of such transformations.
 * 
 * For example, given the input ['R', 'G', 'B', 'G', 'B'], it is possible to end up with
 * a single Qux through the following steps:

        Arrangement       |   Change
----------------------------------------
['R', 'G', 'B', 'G', 'B'] | (R, G) -> B
['B', 'B', 'G', 'B']      | (B, G) -> R
['B', 'R', 'B']           | (R, B) -> G
['B', 'G']                | (B, G) -> R
['R']                     |
*
*/
const toNum = (color: string): number => color === 'R' ? 0 : color === 'G' ? 1 : 2;

const mergePair = (creature1: number, creature2: number): number => 3 - creature1 - creature2;

const quxMerge = (input: string[]): number => {
    let shortest = input.length;

    const mergeHelper = (creatures: number[], depth: number = 0): number => {
        if (depth > 5) {
            return -1; // Short circuit
        }
        console.log(`[${depth}] creatures: ${creatures.join(',')}`);
        for (let i = 0; i < creatures.length; i++) {
            if (creatures[i] !== creatures[i + 1]) {
                const left = creatures.slice(0, i); // '' -> 
                const transformed = mergePair(creatures[i], creatures[i + 1]);
                const right = creatures.slice(i + 2);
                const len = mergeHelper([...left, transformed, ...right], depth + 1);
                if (len < shortest) {
                    shortest = len;
                }
            }
        }
        return shortest;
    }

    return mergeHelper(
        input.map(x => toNum(x)) // Version of input converted to numbers
    );
}

/**
 * ASSERTIONS
 */

console.log(quxMerge(['R', 'G', 'B', 'G', 'B']))
