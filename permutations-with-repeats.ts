/**
 * Recursive solution to find permutations where repition is permissible
 * ['a', 'b'] => '[["a","a"],["a","b"],["b","a"],["b","b"]]'
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


/**
 * ASSERTIONS
 */
console.log(JSON.stringify(permutationsWithRepeats(['a', 'b'])) === '[["a","a"],["a","b"],["b","a"],["b","b"]]')
