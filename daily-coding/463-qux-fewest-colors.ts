/**
 *                    Problem #463 [Easy] - QUXES MERGE CREATURE COLORS
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
 * 
 *         Arrangement       |   Change
 * ----------------------------------------
 * ['R', 'G', 'B', 'G', 'B'] | (R, G) -> B
 * ['B', 'B', 'G', 'B']      | (B, G) -> R
 * ['B', 'R', 'B']           | (R, B) -> G
 * ['B', 'G']                | (B, G) -> R
 * ['R']                     |
 */

/**
 * Converts the color to a creature-number (R: 0, G: 1, B: 2) to make merging simpler
 */
const toNum = (color: string): number => color === 'R' ? 0 : color === 'G' ? 1 : 2;

/**
 * Returns the merged creature number.
 */
const mergePair = (creature1: number, creature2: number): number => 3 - creature1 - creature2;

/**
 * Returns the shortest length of remaining creatures after merging.
 */
const quxMerge = (input: string[]): number => {

    const mergeCreatures = (creatures: number[], depth: number = 0): number => {

        if (depth > 5) {
            return -1; // Short circuit
        }
        let minRemaining = creatures.length;

        // console.log(`[depth: ${depth}] mergeCeatures: ${creatures.join(' ')}`);
        for (let i = 0;
            i < creatures.length -1; // Stop at 2nd last 
            i++) {
            // console.log(`\t\t[i: ${i}/${creatures.length - 1}] ${creatures.join(' ')}`);
            if (creatures[i] !== creatures[i + 1]) {
                const left = creatures.slice(0, i); // '' -> 
                const newCreature = mergePair(creatures[i], creatures[i + 1]);
                const right = i < creatures.length - 2 ? creatures.slice(i + 2) : [];
                 // console.log(`\t\t\t(left: ${left.join(' ')}) + (new: ${newCreature}) + (right: ${right.join(' ')})`);
                const newCreatures = [...left, newCreature, ...right];
                minRemaining = Math.min(minRemaining, mergeCreatures(newCreatures, depth + 1));
            }
        }
        return minRemaining;
    }

    return mergeCreatures(
        input.map(x => toNum(x)) // input converted to creature numbers
    );
}

/**
 * ASSERTIONS
 */
console.log(quxMerge(['R', 'G', 'B', 'G', 'B']) === 1);
console.log(quxMerge(['R', 'R']) === 2);
