/**
 *              Problem #334 [Easy] - Reach 24 Game
 * 
 * This problem was asked by Twitter.
 * 
 * The 24 game is played as follows. You are given a list of four integers, 
 * each between 1 and 9, in a fixed order. By placing the operators +, -, *, and / 
 * between the numbers, and grouping them with parentheses, determine whether it
 * is possible to reach the value 24.
 * 
 * For example, given the input [5, 2, 7, 8], you should return True, 
 * since (5 * 2 - 7) * 8 = 24.
 * 
 * Write a function that plays the 24 game.
*/

const permutationsWithRepeats = <T extends unknown>(input: T[]): T[][] => {
    const permsOut: T[][] = [];

    const recurHelper = (
        index: number, // The index to fix. We recurse through the rest.
        accum: T[], // Array to store outcome of each recursive call
        depth: number = 0 // For circuit breaking
    ) => {
        // console.log('recurHelper', index, depth);

        for (let i = 0; i < input.length; i++) {
            // Fix the index char and recurse for the subsequent chars
            accum[index] = input[i];
            // Reached end when we hit the last char. Otherwise recurse.
            if (index === input.length - 1) {
                permsOut.push([...accum]);
            } else {
                recurHelper(index + 1, accum, depth + 1);
            }
        }
    }

    recurHelper(0, new Array(input.length));
    return permsOut;
}

const canReach24 = (input: number[]): boolean => {
    return false;
}

/**
 * ASSERTIONS
 */
console.log(JSON.stringify(permutationsWithRepeats(['a', 'b'])) === '[["a","a"],["a","b"],["b","a"],["b","b"]]')

console.log(permutationsWithRepeats(['+', '-', '*', '/']));
