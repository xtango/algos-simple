/**
 *              Problem #334 [Easy] - Reach 24 Game
 * 
 * This problem was asked by Twitter.

The 24 game is played as follows. You are given a list of four integers, 
each between 1 and 9, in a fixed order. By placing the operators +, -, *, and / 
between the numbers, and grouping them with parentheses, determine whether it
is possible to reach the value 24.

For example, given the input [5, 2, 7, 8], you should return True, since (5 * 2 - 7) * 8 = 24.

Write a function that plays the 24 game.
*/

/**
 * APPROACH
 *  number of permutations that would have to be evaluated for a given round of 24, where 4 numbers are given and 4 ops are allowed.
 * 
We can arrange the numbers in 4! = 24 ways
We can arrange the three operators in 4p3 ways (ignoring the fact that addition and multiplication are commutative), which also happens to be 4!, which also happens to be 24

Edit: IIRC operations can be repeated, so there are actually 4**3, or 64 "op permutations". This brings us to 1560 permutations to check, which is still reasonable.

The total number of possible "24 equations" for a given selection of four random numbers is 24 * 24, which equals 576. Lucky for us, modern PCs can evaluate 576 arithmetic equations in just a few microseconds.
 */

/**
 * abc => abc, acb, aaa ....
 */
const permutationsWithRepeats = (input: string): string[] => {
    const out: string[] = [];

    // Fix the index char and recurse for the subsequent chars
    const recurHelper = (index: number, depth: number = 0) => {
        console.log('recurHelper', index, depth);
       
        if (depth > 5) return;

        for (let i = 0; i < input.length; i++) {
            // Fix the char at index
            out[index] = input[i];
            // Reached end when last char. Otherwise recurse.
            if (index === input.length - 1) {
                const ele out.join(''); // convert to string
                out.push(elem);
            } else {
                recurHelper(index + 1, depth + 1);
            }
        }
    }
    recurHelper(0);
    return out;
}

const canReach24 = (input: number[]): boolean => {
    return false;
}

/**
 * ASSERTIONS
 */
console.log(permutationsWithRepeats('abc'))

